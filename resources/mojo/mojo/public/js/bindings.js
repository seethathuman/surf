const mojo = {
    internal: {
        interfaceSupport: {}
    },
    interfaceControl: {},
    pipeControl: {}
};
mojo.internal.kArrayHeaderSize = 8,
mojo.internal.kStructHeaderSize = 8,
mojo.internal.kUnionHeaderSize = 8,
mojo.internal.kUnionDataSize = 16,
mojo.internal.kMessageV0HeaderSize = 24,
mojo.internal.kMessageV1HeaderSize = 32,
mojo.internal.kMessageV2HeaderSize = 48,
mojo.internal.kMapDataSize = 24,
mojo.internal.kEncodedInvalidHandleValue = 4294967295,
mojo.internal.kMessageFlagExpectsResponse = 1,
mojo.internal.kMessageFlagIsResponse = 2,
mojo.internal.kInterfaceNamespaceBit = 2147483648,
mojo.internal.kHostLittleEndian = !!new Uint8Array(new Uint16Array([1]).buffer)[0],
mojo.internal.isNullOrUndefined = function(e) {
    return null == e
}
,
mojo.internal.isNullableValueKindField = function(e) {
    return void 0 !== e.nullableValueKindProperties
}
,
mojo.internal.align = function(e, n) {
    return e + (n - e % n) % n
}
,
mojo.internal.setInt64 = function(e, n, t) {
    mojo.internal.kHostLittleEndian ? (e.setUint32(n, Number(BigInt(t) & BigInt(4294967295)), mojo.internal.kHostLittleEndian),
    e.setInt32(n + 4, Number(BigInt(t) >> BigInt(32) & BigInt(4294967295)), mojo.internal.kHostLittleEndian)) : (e.setInt32(n, Number(BigInt(t) >> BigInt(32) & BigInt(4294967295)), mojo.internal.kHostLittleEndian),
    e.setUint32(n + 4, Number(BigInt(t) & BigInt(4294967295)), mojo.internal.kHostLittleEndian))
}
,
mojo.internal.setUint64 = function(e, n, t) {
    mojo.internal.kHostLittleEndian ? (e.setUint32(n, Number(BigInt(t) & BigInt(4294967295)), mojo.internal.kHostLittleEndian),
    e.setUint32(n + 4, Number(BigInt(t) >> BigInt(32) & BigInt(4294967295)), mojo.internal.kHostLittleEndian)) : (e.setUint32(n, Number(BigInt(t) >> BigInt(32) & BigInt(4294967295)), mojo.internal.kHostLittleEndian),
    e.setUint32(n + 4, Number(BigInt(t) & BigInt(4294967295)), mojo.internal.kHostLittleEndian))
}
,
mojo.internal.getInt64 = function(e, n) {
    let t, o;
    return mojo.internal.kHostLittleEndian ? (t = e.getUint32(n, mojo.internal.kHostLittleEndian),
    o = e.getInt32(n + 4, mojo.internal.kHostLittleEndian)) : (t = e.getUint32(n + 4, mojo.internal.kHostLittleEndian),
    o = e.getInt32(n, mojo.internal.kHostLittleEndian)),
    BigInt(o) << BigInt(32) | BigInt(t)
}
,
mojo.internal.getUint64 = function(e, n) {
    let t, o;
    return mojo.internal.kHostLittleEndian ? (t = e.getUint32(n, mojo.internal.kHostLittleEndian),
    o = e.getUint32(n + 4, mojo.internal.kHostLittleEndian)) : (t = e.getUint32(n + 4, mojo.internal.kHostLittleEndian),
    o = e.getUint32(n, mojo.internal.kHostLittleEndian)),
    BigInt(o) << BigInt(32) | BigInt(t)
}
,
mojo.internal.MessageDimensions,
mojo.internal.computeStructDimensions = function(e, n) {
    let t = e.packedSize
      , o = 0;
    for (const i of e.fields) {
        let e = n[i.name];
        if (mojo.internal.isNullOrUndefined(e) && (e = i.defaultValue),
        null !== e)
            if (i.type.$.computeDimensions) {
                const n = i.type.$.computeDimensions(e, i.nullable);
                t += mojo.internal.align(n.size, 8),
                o += n.numInterfaceIds
            } else
                i.type.$.hasInterfaceId && o++
    }
    return {
        size: t,
        numInterfaceIds: o
    }
}
,
mojo.internal.computeUnionDimensions = function(e, n, t) {
    let o = n ? mojo.internal.kUnionDataSize : 0
      , i = 0;
    const r = Object.keys(t);
    if (1 !== r.length)
        throw new Error(`Value for ${e.name} must be an Object with a single property named one of: ` + Object.keys(e.fields).join(","));
    const s = r[0]
      , a = e.fields[s]
      , l = t[s];
    if (!mojo.internal.isNullOrUndefined(l))
        if (a.type.$.computeDimensions) {
            const e = !!a.type.$.unionSpec || a.nullable
              , n = a.type.$.computeDimensions(l, e);
            o += mojo.internal.align(n.size, 8),
            i += n.numInterfaceIds
        } else
            a.type.$.hasInterfaceId && i++;
    return {
        size: o,
        numInterfaceIds: i
    }
}
,
mojo.internal.computeInlineArraySize = function(e, n) {
    return e.elementType === mojo.internal.Bool ? mojo.internal.kArrayHeaderSize + (n.length + 7 >> 3) : mojo.internal.kArrayHeaderSize + n.length * e.elementType.$.arrayElementSize(!!e.elementNullable)
}
,
mojo.internal.computeTotalArraySize = function(e, n) {
    const t = mojo.internal.computeInlineArraySize(e, n);
    if (!e.elementType.$.computeDimensions)
        return t;
    let o = t;
    for (let t of n)
        mojo.internal.isNullOrUndefined(t) || (o += mojo.internal.align(e.elementType.$.computeDimensions(t, !!e.elementNullable).size, 8));
    return o
}
,
mojo.internal.Message = class {
    constructor(e, n, t, o, i, r, s) {
        const a = mojo.internal.computeStructDimensions(r, s);
        let l, c;
        a.numInterfaceIds > 0 ? (l = mojo.internal.kMessageV2HeaderSize,
        c = 2) : 0 == (t & (mojo.internal.kMessageFlagExpectsResponse | mojo.internal.kMessageFlagIsResponse)) ? (l = mojo.internal.kMessageV0HeaderSize,
        c = 0) : (l = mojo.internal.kMessageV1HeaderSize,
        c = 1);
        const d = l + a.size
          , u = a.numInterfaceIds > 0 ? mojo.internal.kArrayHeaderSize + 4 * a.numInterfaceIds : 0
          , p = d + mojo.internal.align(u, 8);
        this.buffer = new ArrayBuffer(p),
        this.handles = [];
        const m = new DataView(this.buffer);
        m.setUint32(0, l, mojo.internal.kHostLittleEndian),
        m.setUint32(4, c, mojo.internal.kHostLittleEndian),
        m.setUint32(8, n, mojo.internal.kHostLittleEndian),
        m.setUint32(12, o, mojo.internal.kHostLittleEndian),
        m.setUint32(16, t, mojo.internal.kHostLittleEndian),
        m.setUint32(20, 0),
        c >= 1 && (mojo.internal.setUint64(m, 24, i),
        c >= 2 && (mojo.internal.setUint64(m, 32, BigInt(16)),
        mojo.internal.setUint64(m, 40, BigInt(d - 40)),
        m.setUint32(d, u, mojo.internal.kHostLittleEndian),
        m.setUint32(d + 4, a.numInterfaceIds || 0, mojo.internal.kHostLittleEndian))),
        this.nextInterfaceIdIndex_ = 0,
        this.interfaceIds_ = null,
        a.numInterfaceIds && (this.interfaceIds_ = new Uint32Array(this.buffer,d + mojo.internal.kArrayHeaderSize,a.numInterfaceIds)),
        this.nextAllocationOffset_ = l;
        const h = this.allocate(r.packedSize);
        new mojo.internal.Encoder(this,h,{
            endpoint: e
        }).encodeStructInline(r, s)
    }
    allocate(e) {
        const n = mojo.internal.align(e, 8)
          , t = new DataView(this.buffer,this.nextAllocationOffset_,n);
        return this.nextAllocationOffset_ += n,
        t
    }
}
,
mojo.internal.MessageContext,
mojo.internal.Encoder = class {
    constructor(e, n, t=null) {
        this.context_ = t,
        this.message_ = e,
        this.data_ = n
    }
    encodeBool(e, n, t) {
        const o = this.data_.getUint8(e);
        t ? this.data_.setUint8(e, o | 1 << n) : this.data_.setUint8(e, o & ~(1 << n))
    }
    encodeInt8(e, n) {
        this.data_.setInt8(e, n)
    }
    encodeUint8(e, n) {
        this.data_.setUint8(e, n)
    }
    encodeInt16(e, n) {
        this.data_.setInt16(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeUint16(e, n) {
        this.data_.setUint16(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeInt32(e, n) {
        this.data_.setInt32(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeUint32(e, n) {
        this.data_.setUint32(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeInt64(e, n) {
        mojo.internal.setInt64(this.data_, e, n)
    }
    encodeUint64(e, n) {
        mojo.internal.setUint64(this.data_, e, n)
    }
    encodeFloat(e, n) {
        this.data_.setFloat32(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeDouble(e, n) {
        this.data_.setFloat64(e, n, mojo.internal.kHostLittleEndian)
    }
    encodeHandle(e, n) {
        this.encodeUint32(e, this.message_.handles.length),
        this.message_.handles.push(n)
    }
    encodeAssociatedEndpoint(e, n) {
        console.assert(n.isPendingAssociation, "expected unbound associated endpoint");
        const t = this.context_.endpoint.associatePeerOfOutgoingEndpoint(n)
          , o = this.message_.nextInterfaceIdIndex_++;
        this.encodeUint32(e, o),
        this.message_.interfaceIds_[o] = t
    }
    encodeString(e, n) {
        if ("string" != typeof n)
            throw new Error("Unxpected non-string value for string field.");
        this.encodeArray({
            elementType: mojo.internal.Uint8
        }, e, mojo.internal.Encoder.stringToUtf8Bytes(n))
    }
    encodeOffset(e, n) {
        this.encodeUint64(e, n - this.data_.byteOffset - e)
    }
    encodeArray(e, n, t) {
        const o = mojo.internal.computeInlineArraySize(e, t)
          , i = this.message_.allocate(o)
          , r = new mojo.internal.Encoder(this.message_,i,this.context_);
        this.encodeOffset(n, i.byteOffset),
        r.encodeUint32(0, o),
        r.encodeUint32(4, t.length);
        let s = 8;
        if (e.elementType === mojo.internal.Bool) {
            let e = 0;
            for (const n of t)
                r.encodeBool(s, e, n),
                e++,
                8 == e && (e = 0,
                s++)
        } else
            for (const n of t) {
                if (null === n) {
                    if (!e.elementNullable)
                        throw new Error("Trying to send a null element in an array of non-nullable elements");
                    e.elementType.$.encodeNull(r, s)
                }
                e.elementType.$.encode(n, r, s, 0, !!e.elementNullable),
                s += e.elementType.$.arrayElementSize(!!e.elementNullable)
            }
    }
    encodeMap(e, n, t) {
        let o, i;
        "Map" == t.constructor.name ? (o = Array.from(t.keys()),
        i = Array.from(t.values())) : (o = Object.keys(t),
        i = o.map((e=>t[e])));
        const r = this.message_.allocate(mojo.internal.kMapDataSize)
          , s = new mojo.internal.Encoder(this.message_,r,this.context_);
        this.encodeOffset(n, r.byteOffset),
        s.encodeUint32(0, mojo.internal.kMapDataSize),
        s.encodeUint32(4, 0),
        s.encodeArray({
            elementType: e.keyType
        }, 8, o),
        s.encodeArray({
            elementType: e.valueType,
            elementNullable: e.valueNullable
        }, 16, i)
    }
    encodeStruct(e, n, t) {
        const o = this.message_.allocate(e.packedSize)
          , i = new mojo.internal.Encoder(this.message_,o,this.context_);
        this.encodeOffset(n, o.byteOffset),
        i.encodeStructInline(e, t)
    }
    encodeStructInline(e, n) {
        const t = e.versions;
        this.encodeUint32(0, e.packedSize),
        this.encodeUint32(4, t[t.length - 1].version);
        for (const t of e.fields) {
            const o = mojo.internal.kStructHeaderSize + t.packedOffset
              , i = e=>{
                t.type.$.encode(e, this, o, t.packedBitOffset, t.nullable)
            }
            ;
            if (n && mojo.internal.isNullableValueKindField(t)) {
                const e = t.nullableValueKindProperties
                  , o = !mojo.internal.isNullOrUndefined(n[e.originalFieldName]);
                e.isPrimary ? i(o) : i(o ? n[e.originalFieldName] : t.defaultValue)
            } else if (!n || mojo.internal.isNullOrUndefined(n[t.name]))
                if (null === t.defaultValue) {
                    if (!t.nullable)
                        throw new Error(e.name + ' missing value for non-nullable field "' + t.name + '"');
                    t.type.$.encodeNull(this, o)
                } else
                    i(t.defaultValue);
            else
                i(n[t.name])
        }
    }
    encodeUnionAsPointer(e, n, t) {
        const o = this.message_.allocate(mojo.internal.kUnionDataSize)
          , i = new mojo.internal.Encoder(this.message_,o,this.context_);
        this.encodeOffset(n, o.byteOffset),
        i.encodeUnion(e, 0, t)
    }
    encodeUnion(e, n, t) {
        const o = Object.keys(t);
        if (1 !== o.length)
            throw new Error(`Value for ${e.name} must be an Object with a single property named one of: ` + Object.keys(e.fields).join(","));
        const i = o[0]
          , r = e.fields[i];
        this.encodeUint32(n, mojo.internal.kUnionDataSize),
        this.encodeUint32(n + 4, r.ordinal);
        const s = n + mojo.internal.kUnionHeaderSize;
        void 0 === r.type.$.unionSpec ? r.type.$.encode(t[i], this, s, 0, r.nullable) : this.encodeUnionAsPointer(r.type.$.unionSpec, s, t[i])
    }
    static stringToUtf8Bytes(e) {
        return mojo.internal.Encoder.textEncoder || (mojo.internal.Encoder.textEncoder = new TextEncoder("utf-8")),
        mojo.internal.Encoder.textEncoder.encode(e)
    }
}
,
mojo.internal.Encoder.textEncoder = null,
mojo.internal.Decoder = class {
    constructor(e, n, t=null) {
        this.context_ = t,
        this.data_ = e,
        this.handles_ = n
    }
    decodeBool(e, n) {
        return !!(this.data_.getUint8(e) & 1 << n)
    }
    decodeInt8(e) {
        return this.data_.getInt8(e)
    }
    decodeUint8(e) {
        return this.data_.getUint8(e)
    }
    decodeInt16(e) {
        return this.data_.getInt16(e, mojo.internal.kHostLittleEndian)
    }
    decodeUint16(e) {
        return this.data_.getUint16(e, mojo.internal.kHostLittleEndian)
    }
    decodeInt32(e) {
        return this.data_.getInt32(e, mojo.internal.kHostLittleEndian)
    }
    decodeUint32(e) {
        return this.data_.getUint32(e, mojo.internal.kHostLittleEndian)
    }
    decodeInt64(e) {
        return mojo.internal.getInt64(this.data_, e)
    }
    decodeUint64(e) {
        return mojo.internal.getUint64(this.data_, e)
    }
    decodeFloat(e) {
        return this.data_.getFloat32(e, mojo.internal.kHostLittleEndian)
    }
    decodeDouble(e) {
        return this.data_.getFloat64(e, mojo.internal.kHostLittleEndian)
    }
    decodeHandle(e) {
        const n = this.data_.getUint32(e, mojo.internal.kHostLittleEndian);
        if (4294967295 == n)
            return null;
        if (n >= this.handles_.length)
            throw new Error("Decoded invalid handle index");
        return this.handles_[n]
    }
    decodeString(e) {
        const n = this.decodeArray({
            elementType: mojo.internal.Uint8
        }, e);
        return n ? (mojo.internal.Decoder.textDecoder || (mojo.internal.Decoder.textDecoder = new TextDecoder("utf-8")),
        mojo.internal.Decoder.textDecoder.decode(new Uint8Array(n).buffer)) : null
    }
    decodeOffset(e) {
        const n = this.decodeUint64(e);
        if (0 == n)
            return 0;
        if (n > BigInt(Number.MAX_SAFE_INTEGER))
            throw new Error("Mesage offset too large");
        return this.data_.byteOffset + e + Number(n)
    }
    decodeArray(e, n) {
        const t = this.decodeOffset(n);
        if (!t)
            return null;
        const o = new mojo.internal.Decoder(new DataView(this.data_.buffer,t),this.handles_,this.context_)
          , i = o.decodeUint32(4);
        if (!i)
            return [];
        const r = [];
        if (e.elementType === mojo.internal.Bool)
            for (let e = 0; e < i; ++e)
                r.push(o.decodeBool(8 + (e >> 3), e % 8));
        else {
            let n = 8;
            for (let t = 0; t < i; ++t) {
                const t = e.elementType.$.decode(o, n, 0, !!e.elementNullable);
                if (null === t && !e.elementNullable)
                    throw new Error("Received unexpected array element");
                r.push(t),
                n += e.elementType.$.arrayElementSize(!!e.elementNullable)
            }
        }
        return r
    }
    decodeMap(e, n) {
        const t = this.decodeOffset(n);
        if (!t)
            return null;
        const o = new mojo.internal.Decoder(new DataView(this.data_.buffer,t),this.handles_,this.context_)
          , i = o.decodeUint32(0)
          , r = o.decodeUint32(4);
        if (i != mojo.internal.kMapDataSize || 0 != r)
            throw new Error("Received invalid map data");
        const s = o.decodeArray({
            elementType: e.keyType
        }, 8)
          , a = o.decodeArray({
            elementType: e.valueType,
            elementNullable: e.valueNullable
        }, 16);
        if (s.length != a.length)
            throw new Error("Received invalid map data");
        if (!e.keyType.$.isValidObjectKeyType) {
            const e = new Map;
            for (let n = 0; n < s.length; ++n)
                e.set(s[n], a[n]);
            return e
        }
        const l = {};
        for (let e = 0; e < s.length; ++e)
            l[s[e]] = a[e];
        return l
    }
    decodeStruct(e, n) {
        const t = this.decodeOffset(n);
        if (!t)
            return null;
        return new mojo.internal.Decoder(new DataView(this.data_.buffer,t),this.handles_,this.context_).decodeStructInline(e)
    }
    isStructHeaderValid(e, n, t) {
        const o = e.versions;
        for (let e = o.length - 1; e >= 0; --e) {
            const i = o[e];
            if (t > i.version)
                return n >= i.packedSize;
            if (t == i.version)
                return n == i.packedSize
        }
        throw new Error(`Impossible version ${t} for struct ${e.name}`)
    }
    decodeStructInline(e) {
        const n = this.decodeUint32(0)
          , t = this.decodeUint32(4);
        if (!this.isStructHeaderValid(e, n, t))
            throw new Error(`Received ${e.name} of invalid size (${n}) and/or version (${t})`);
        const o = n=>{
            const t = mojo.internal.kStructHeaderSize + n.packedOffset
              , o = n.type.$.decode(this, t, n.packedBitOffset, !!n.nullable);
            if (null === o && !n.nullable)
                throw new Error(`Received ${e.name} with invalid null field "${n.name}"`);
            return o
        }
          , i = {};
        for (const n of e.fields)
            if (mojo.internal.isNullableValueKindField(n)) {
                const e = n.nullableValueKindProperties;
                if (e.isPrimary && n.minVersion > t)
                    i[e.originalFieldName] = null;
                else if (e.isPrimary) {
                    o(n) || (i[e.originalFieldName] = null)
                } else
                    e.originalFieldName in i || (i[e.originalFieldName] = o(n))
            } else
                n.minVersion > t ? i[n.name] = n.defaultValue : i[n.name] = o(n);
        return i
    }
    decodeUnionFromPointer(e, n) {
        const t = this.decodeOffset(n);
        if (!t)
            return null;
        return new mojo.internal.Decoder(new DataView(this.data_.buffer,t),this.handles_,this.context_).decodeUnion(e, 0)
    }
    decodeUnion(e, n) {
        if (0 === this.decodeUint32(n))
            return null;
        const t = this.decodeUint32(n + 4);
        for (const o in e.fields) {
            const i = e.fields[o];
            if (i.ordinal === t) {
                const t = (()=>{
                    const e = n + mojo.internal.kUnionHeaderSize;
                    return void 0 !== i.type.$.unionSpec ? this.decodeUnionFromPointer(i.type.$.unionSpec, e) : i.type.$.decode(this, e, 0, i.nullable)
                }
                )();
                if (null === t && !i.nullable)
                    throw new Error(`Received ${e.name} with invalid null field: ${i.name}`);
                const r = {};
                return r[o] = t,
                r
            }
        }
    }
    decodeInterfaceProxy(e, n) {
        const t = this.decodeHandle(n);
        return t ? new e(t) : null
    }
    decodeInterfaceRequest(e, n) {
        const t = this.decodeHandle(n);
        return t ? new e(mojo.internal.interfaceSupport.createEndpoint(t)) : null
    }
    decodeAssociatedEndpoint(e) {
        if (!this.context_ || !this.context_.endpoint)
            throw new Error("cannot deserialize associated endpoint without context");
        const n = this.context_.endpoint
          , t = new DataView(this.data_.buffer)
          , o = Number(mojo.internal.getUint64(t, 40))
          , i = t.getUint32(o + 44, mojo.internal.kHostLittleEndian)
          , r = new Uint32Array(t.buffer,o + mojo.internal.kArrayHeaderSize + 40,i)[this.decodeUint32(e)];
        return new mojo.internal.interfaceSupport.Endpoint(n.router,r)
    }
}
,
mojo.internal.Decoder.textDecoder = null,
mojo.internal.MessageHeader,
mojo.internal.deserializeMessageHeader = function(e) {
    const n = e.getUint32(0, mojo.internal.kHostLittleEndian)
      , t = e.getUint32(4, mojo.internal.kHostLittleEndian);
    if (0 == t && n != mojo.internal.kMessageV0HeaderSize || 1 == t && n != mojo.internal.kMessageV1HeaderSize || t > 2)
        throw new Error("Received invalid message header");
    return {
        headerSize: n,
        headerVersion: t,
        interfaceId: e.getUint32(8, mojo.internal.kHostLittleEndian),
        ordinal: e.getUint32(12, mojo.internal.kHostLittleEndian),
        flags: e.getUint32(16, mojo.internal.kHostLittleEndian),
        requestId: t < 1 ? 0 : e.getUint32(24, mojo.internal.kHostLittleEndian)
    }
}
,
mojo.internal.MojomTypeInfo,
mojo.internal.MojomType,
mojo.internal.ArraySpec,
mojo.internal.MapSpec,
mojo.internal.NullableValueKindProperties = class {
    constructor() {
        this.isPrimary,
        this.linkedValueFieldName,
        this.originalFieldName
    }
}
,
mojo.internal.StructFieldSpec,
mojo.internal.StructVersionInfo,
mojo.internal.StructSpec,
mojo.internal.UnionFieldSpec,
mojo.internal.UnionSpec,
mojo.internal.Bool = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeBool(t, o, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeBool(n, t)
        },
        isValidObjectKeyType: !0
    }
},
mojo.internal.Int8 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeInt8(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeInt8(n)
        },
        arrayElementSize: e=>1,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Uint8 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeUint8(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeUint8(n)
        },
        arrayElementSize: e=>1,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Int16 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeInt16(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeInt16(n)
        },
        arrayElementSize: e=>2,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Uint16 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeUint16(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeUint16(n)
        },
        arrayElementSize: e=>2,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Int32 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeInt32(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeInt32(n)
        },
        arrayElementSize: e=>4,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Uint32 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeUint32(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeUint32(n)
        },
        arrayElementSize: e=>4,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Int64 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeInt64(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeInt64(n)
        },
        arrayElementSize: e=>8,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Uint64 = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeUint64(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeUint64(n)
        },
        arrayElementSize: e=>8,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Float = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeFloat(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeFloat(n)
        },
        arrayElementSize: e=>4,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Double = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeDouble(t, e)
        },
        decode: function(e, n, t, o) {
            return e.decodeDouble(n)
        },
        arrayElementSize: e=>8,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Handle = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeHandle(t, e)
        },
        encodeNull: function(e, n) {
            e.encodeUint32(n, 4294967295)
        },
        decode: function(e, n, t, o) {
            return e.decodeHandle(n)
        },
        arrayElementSize: e=>4,
        isValidObjectKeyType: !1
    }
},
mojo.internal.String = {
    $: {
        encode: function(e, n, t, o, i) {
            n.encodeString(t, e)
        },
        encodeNull: function(e, n) {},
        decode: function(e, n, t, o) {
            return e.decodeString(n)
        },
        computeDimensions: function(e, n) {
            return {
                size: mojo.internal.computeTotalArraySize({
                    elementType: mojo.internal.Uint8
                }, mojo.internal.Encoder.stringToUtf8Bytes(e))
            }
        },
        arrayElementSize: e=>8,
        isValidObjectKeyType: !0
    }
},
mojo.internal.Array = function(e, n) {
    const t = {
        elementType: e,
        elementNullable: n
    };
    return {
        $: {
            arraySpec: t,
            encode: function(e, n, o, i, r) {
                n.encodeArray(t, o, e)
            },
            encodeNull: function(e, n) {},
            decode: function(e, n, o, i) {
                return e.decodeArray(t, n)
            },
            computeDimensions: function(e, n) {
                return {
                    size: mojo.internal.computeTotalArraySize(t, e)
                }
            },
            arrayElementSize: e=>8,
            isValidObjectKeyType: !1
        }
    }
}
,
mojo.internal.Map = function(e, n, t) {
    const o = {
        keyType: e,
        valueType: n,
        valueNullable: t
    };
    return {
        $: {
            mapSpec: o,
            encode: function(e, n, t, i, r) {
                n.encodeMap(o, t, e)
            },
            encodeNull: function(e, n) {},
            decode: function(e, n, t, i) {
                return e.decodeMap(o, n)
            },
            computeDimensions: function(o, i) {
                const r = "Map" == o.constructor.name ? Array.from(o.keys()) : Object.keys(o)
                  , s = "Map" == o.constructor.name ? Array.from(o.values()) : r.map((e=>o[e]));
                return {
                    size: mojo.internal.kMapDataSize + mojo.internal.align(mojo.internal.computeTotalArraySize({
                        elementType: e
                    }, r), 8) + mojo.internal.computeTotalArraySize({
                        elementType: n,
                        elementNullable: t
                    }, s)
                }
            },
            arrayElementSize: e=>8,
            isValidObjectKeyType: !1
        }
    }
}
,
mojo.internal.Enum = function() {
    return {
        $: {
            encode: function(e, n, t, o, i) {
                n.encodeUint32(t, e)
            },
            decode: function(e, n, t, o) {
                return e.decodeInt32(n)
            },
            arrayElementSize: e=>4,
            isValidObjectKeyType: !0
        }
    }
}
,
mojo.internal.StructField = function(e, n, t, o, i, r, s=0, a=void 0) {
    return {
        name: e,
        packedOffset: n,
        packedBitOffset: t,
        type: o,
        defaultValue: i,
        nullable: r,
        minVersion: s,
        nullableValueKindProperties: a
    }
}
,
mojo.internal.Struct = function(e, n, t, o) {
    const i = o.map((e=>({
        version: e[0],
        packedSize: e[1]
    })))
      , r = {
        name: n,
        packedSize: i[i.length - 1].packedSize,
        fields: t,
        versions: i
    };
    e.$ = {
        structSpec: r,
        encode: function(e, n, t, o, i) {
            n.encodeStruct(r, t, e)
        },
        encodeNull: function(e, n) {},
        decode: function(e, n, t, o) {
            return e.decodeStruct(r, n)
        },
        computeDimensions: function(e, n) {
            return mojo.internal.computeStructDimensions(r, e)
        },
        arrayElementSize: e=>8,
        isValidObjectKeyType: !1
    }
}
,
mojo.internal.createStructDeserializer = function(e) {
    return function(n) {
        if (null == e.$ || null == e.$.structSpec)
            throw new Error("Invalid struct mojom type!");
        return new mojo.internal.Decoder(n,[]).decodeStructInline(e.$.structSpec)
    }
}
,
mojo.internal.Union = function(e, n, t) {
    const o = {
        name: n,
        fields: t
    };
    e.$ = {
        unionSpec: o,
        encode: function(e, n, t, i, r) {
            n.encodeUnion(o, t, e)
        },
        encodeNull: function(e, n) {},
        decode: function(e, n, t, i) {
            return e.decodeUnion(o, n)
        },
        computeDimensions: function(e, n) {
            return mojo.internal.computeUnionDimensions(o, n, e)
        },
        arrayElementSize: e=>e ? 8 : 16,
        isValidObjectKeyType: !1
    }
}
,
mojo.internal.InterfaceProxy = function(e) {
    return {
        $: {
            encode: function(n, t, o, i, r) {
                const s = n.proxy.unbind();
                console.assert(s, `unexpected null ${e.name}`);
                const a = s.releasePipe();
                t.encodeHandle(o, a),
                t.encodeUint32(o + 4, 0)
            },
            encodeNull: function(e, n) {
                e.encodeUint32(n, 4294967295)
            },
            decode: function(n, t, o, i) {
                return n.decodeInterfaceProxy(e, t)
            },
            arrayElementSize: e=>8,
            isValidObjectKeyType: !1
        }
    }
}
,
mojo.internal.InterfaceRequest = function(e) {
    return {
        $: {
            encode: function(n, t, o, i, r) {
                if (!n.handle)
                    throw new Error("Unexpected null " + e.name);
                t.encodeHandle(o, n.handle.releasePipe())
            },
            encodeNull: function(e, n) {
                e.encodeUint32(n, 4294967295)
            },
            decode: function(n, t, o, i) {
                return n.decodeInterfaceRequest(e, t)
            },
            arrayElementSize: e=>8,
            isValidObjectKeyType: !1
        }
    }
}
,
mojo.internal.AssociatedInterfaceProxy = function(e) {
    return {
        $: {
            type: e,
            encode: function(n, t, o, i, r) {
                console.assert(n.proxy.endpoint && n.proxy.endpoint.isPendingAssociation, `expected ${e.name} to be associated and unbound`),
                t.encodeAssociatedEndpoint(o, n.proxy.endpoint),
                t.encodeUint32(o + 4, 0)
            },
            encodeNull: function(e, n) {
                e.encodeUint32(n, 4294967295),
                e.encodeUint32(n + 4, 0)
            },
            decode: function(n, t, o, i) {
                return new e(n.decodeAssociatedEndpoint(t))
            },
            arrayElementSize: e=>{
                throw new Error("Arrays of associated endpoints are not yet supported")
            }
            ,
            isValidObjectKeyType: !1,
            hasInterfaceId: !0
        }
    }
}
,
mojo.internal.AssociatedInterfaceRequest = function(e) {
    return {
        $: {
            type: e,
            encode: function(n, t, o, i, r) {
                console.assert(n.handle && n.handle.isPendingAssociation, `expected ${e.name} to be associated and unbound`),
                t.encodeAssociatedEndpoint(o, n.handle)
            },
            encodeNull: function(e, n) {
                e.encodeUint32(n, 4294967295)
            },
            decode: function(n, t, o, i) {
                return new e(n.decodeAssociatedEndpoint(t))
            },
            arrayElementSize: e=>{
                throw new Error("Arrays of associated endpoints are not yet supported")
            }
            ,
            isValidObjectKeyType: !1,
            hasInterfaceId: !0
        }
    }
}
,
mojo.interfaceControl.RUN_MESSAGE_ID = 4294967295,
mojo.interfaceControl.RUN_OR_CLOSE_PIPE_MESSAGE_ID = 4294967294,
mojo.interfaceControl.RunMessageParamsSpec = {
    $: {}
},
mojo.interfaceControl.RunResponseMessageParamsSpec = {
    $: {}
},
mojo.interfaceControl.QueryVersionSpec = {
    $: {}
},
mojo.interfaceControl.QueryVersionResultSpec = {
    $: {}
},
mojo.interfaceControl.FlushForTestingSpec = {
    $: {}
},
mojo.interfaceControl.RunOrClosePipeMessageParamsSpec = {
    $: {}
},
mojo.interfaceControl.RequireVersionSpec = {
    $: {}
},
mojo.interfaceControl.EnableIdleTrackingSpec = {
    $: {}
},
mojo.interfaceControl.MessageAckSpec = {
    $: {}
},
mojo.interfaceControl.NotifyIdleSpec = {
    $: {}
},
mojo.interfaceControl.RunInputSpec = {
    $: {}
},
mojo.interfaceControl.RunOutputSpec = {
    $: {}
},
mojo.interfaceControl.RunOrClosePipeInputSpec = {
    $: {}
},
mojo.internal.Struct(mojo.interfaceControl.RunMessageParamsSpec.$, "RunMessageParams", [mojo.internal.StructField("input", 0, 0, mojo.interfaceControl.RunInputSpec.$, null, !1, 0)], [[0, 24]]),
mojo.interfaceControl.RunMessageParams = class {
    constructor() {
        this.input
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.RunResponseMessageParamsSpec.$, "RunResponseMessageParams", [mojo.internal.StructField("output", 0, 0, mojo.interfaceControl.RunOutputSpec.$, null, !0, 0)], [[0, 24]]),
mojo.interfaceControl.RunResponseMessageParams = class {
    constructor() {
        this.output
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.QueryVersionSpec.$, "QueryVersion", [], [[0, 8]]),
mojo.interfaceControl.QueryVersion = class {
    constructor() {}
}
,
mojo.internal.Struct(mojo.interfaceControl.QueryVersionResultSpec.$, "QueryVersionResult", [mojo.internal.StructField("version", 0, 0, mojo.internal.Uint32, 0, !1, 0)], [[0, 16]]),
mojo.interfaceControl.QueryVersionResult = class {
    constructor() {
        this.version
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.FlushForTestingSpec.$, "FlushForTesting", [], [[0, 8]]),
mojo.interfaceControl.FlushForTesting = class {
    constructor() {}
}
,
mojo.internal.Struct(mojo.interfaceControl.RunOrClosePipeMessageParamsSpec.$, "RunOrClosePipeMessageParams", [mojo.internal.StructField("input", 0, 0, mojo.interfaceControl.RunOrClosePipeInputSpec.$, null, !1, 0)], [[0, 24]]),
mojo.interfaceControl.RunOrClosePipeMessageParams = class {
    constructor() {
        this.input
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.RequireVersionSpec.$, "RequireVersion", [mojo.internal.StructField("version", 0, 0, mojo.internal.Uint32, 0, !1, 0)], [[0, 16]]),
mojo.interfaceControl.RequireVersion = class {
    constructor() {
        this.version
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.EnableIdleTrackingSpec.$, "EnableIdleTracking", [mojo.internal.StructField("timeoutInMicroseconds", 0, 0, mojo.internal.Int64, BigInt(0), !1, 0)], [[0, 16]]),
mojo.interfaceControl.EnableIdleTracking = class {
    constructor() {
        this.timeoutInMicroseconds
    }
}
,
mojo.internal.Struct(mojo.interfaceControl.MessageAckSpec.$, "MessageAck", [], [[0, 8]]),
mojo.interfaceControl.MessageAck = class {
    constructor() {}
}
,
mojo.internal.Struct(mojo.interfaceControl.NotifyIdleSpec.$, "NotifyIdle", [], [[0, 8]]),
mojo.interfaceControl.NotifyIdle = class {
    constructor() {}
}
,
mojo.internal.Union(mojo.interfaceControl.RunInputSpec.$, "RunInput", {
    queryVersion: {
        ordinal: 0,
        type: mojo.interfaceControl.QueryVersionSpec.$
    },
    flushForTesting: {
        ordinal: 1,
        type: mojo.interfaceControl.FlushForTestingSpec.$
    }
}),
mojo.interfaceControl.RunInput,
mojo.internal.Union(mojo.interfaceControl.RunOutputSpec.$, "RunOutput", {
    queryVersionResult: {
        ordinal: 0,
        type: mojo.interfaceControl.QueryVersionResultSpec.$
    }
}),
mojo.interfaceControl.RunOutput,
mojo.internal.Union(mojo.interfaceControl.RunOrClosePipeInputSpec.$, "RunOrClosePipeInput", {
    requireVersion: {
        ordinal: 0,
        type: mojo.interfaceControl.RequireVersionSpec.$
    },
    enableIdleTracking: {
        ordinal: 1,
        type: mojo.interfaceControl.EnableIdleTrackingSpec.$
    },
    messageAck: {
        ordinal: 2,
        type: mojo.interfaceControl.MessageAckSpec.$
    },
    notifyIdle: {
        ordinal: 3,
        type: mojo.interfaceControl.NotifyIdleSpec.$
    }
}),
mojo.interfaceControl.RunOrClosePipeInput,
mojo.pipeControl.RUN_OR_CLOSE_PIPE_MESSAGE_ID = 4294967294,
mojo.pipeControl.RunOrClosePipeMessageParamsSpec = {
    $: {}
},
mojo.pipeControl.DisconnectReasonSpec = {
    $: {}
},
mojo.pipeControl.PeerAssociatedEndpointClosedEventSpec = {
    $: {}
},
mojo.pipeControl.PauseUntilFlushCompletesSpec = {
    $: {}
},
mojo.pipeControl.FlushAsyncSpec = {
    $: {}
},
mojo.pipeControl.RunOrClosePipeInputSpec = {
    $: {}
},
mojo.internal.Struct(mojo.pipeControl.RunOrClosePipeMessageParamsSpec.$, "RunOrClosePipeMessageParams", [mojo.internal.StructField("input", 0, 0, mojo.pipeControl.RunOrClosePipeInputSpec.$, null, !1, 0)], [[0, 24]]),
mojo.pipeControl.RunOrClosePipeMessageParams = class {
    constructor() {
        this.input
    }
}
,
mojo.internal.Struct(mojo.pipeControl.DisconnectReasonSpec.$, "DisconnectReason", [mojo.internal.StructField("customReason", 0, 0, mojo.internal.Uint32, 0, !1, 0), mojo.internal.StructField("description", 8, 0, mojo.internal.String, null, !1, 0)], [[0, 24]]),
mojo.pipeControl.DisconnectReason = class {
    constructor() {
        this.customReason,
        this.description
    }
}
,
mojo.internal.Struct(mojo.pipeControl.PeerAssociatedEndpointClosedEventSpec.$, "PeerAssociatedEndpointClosedEvent", [mojo.internal.StructField("id", 0, 0, mojo.internal.Uint32, 0, !1, 0), mojo.internal.StructField("disconnectReason", 8, 0, mojo.pipeControl.DisconnectReasonSpec.$, null, !0, 0)], [[0, 24]]),
mojo.pipeControl.PeerAssociatedEndpointClosedEvent = class {
    constructor() {
        this.id,
        this.disconnectReason
    }
}
,
mojo.internal.Struct(mojo.pipeControl.PauseUntilFlushCompletesSpec.$, "PauseUntilFlushCompletes", [mojo.internal.StructField("flushPipe", 0, 0, mojo.internal.Handle, null, !1, 0)], [[0, 16]]),
mojo.pipeControl.PauseUntilFlushCompletes = class {
    constructor() {
        this.flushPipe
    }
}
,
mojo.internal.Struct(mojo.pipeControl.FlushAsyncSpec.$, "FlushAsync", [mojo.internal.StructField("flusherPipe", 0, 0, mojo.internal.Handle, null, !1, 0)], [[0, 16]]),
mojo.pipeControl.FlushAsync = class {
    constructor() {
        this.flusherPipe
    }
}
,
mojo.internal.Union(mojo.pipeControl.RunOrClosePipeInputSpec.$, "RunOrClosePipeInput", {
    peerAssociatedEndpointClosedEvent: {
        ordinal: 0,
        type: mojo.pipeControl.PeerAssociatedEndpointClosedEventSpec.$
    },
    pauseUntilFlushCompletes: {
        ordinal: 1,
        type: mojo.pipeControl.PauseUntilFlushCompletesSpec.$
    },
    flushAsync: {
        ordinal: 2,
        type: mojo.pipeControl.FlushAsyncSpec.$
    }
}),
mojo.pipeControl.RunOrClosePipeInput,
mojo.internal.interfaceSupport.Router = class {
    constructor(e, n) {
        this.pipe_ = e,
        this.reader_ = new mojo.internal.interfaceSupport.HandleReader(e),
        this.reader_.onRead = this.onMessageReceived_.bind(this),
        this.reader_.onError = this.onError_.bind(this),
        this.endpoints_ = new Map,
        this.nextInterfaceId_ = 1,
        this.interfaceIdNamespace_ = n ? mojo.internal.kInterfaceNamespaceBit : 0,
        this.pipeControlHandler_ = new mojo.internal.interfaceSupport.PipeControlMessageHandler(this,this.onPeerEndpointClosed_.bind(this))
    }
    get pipe() {
        return this.pipe_
    }
    generateInterfaceId() {
        return (this.nextInterfaceId_++ | this.interfaceIdNamespace_) >>> 0
    }
    addEndpoint(e, n) {
        0 === n && this.reader_.start(),
        console.assert(this.isReading(), "adding a secondary endpoint with no primary"),
        this.endpoints_.set(n, e)
    }
    removeEndpoint(e) {
        this.endpoints_.delete(e),
        0 === e && this.reader_.stop()
    }
    close() {
        console.assert(0 === this.endpoints_.size, "closing primary endpoint with secondary endpoints still bound"),
        this.reader_.stopAndCloseHandle()
    }
    closeEndpoint(e) {
        this.removeEndpoint(e),
        0 === e ? this.close() : this.pipeControlHandler_.notifyEndpointClosed(e)
    }
    isReading() {
        return !this.reader_.isStopped()
    }
    send(e) {
        this.pipe_.writeMessage(e.buffer, e.handles)
    }
    onMessageReceived_(e, n) {
        if (e.byteLength < mojo.internal.kMessageV0HeaderSize)
            return console.error("Rejecting undersized message"),
            void this.onError_();
        const t = mojo.internal.deserializeMessageHeader(new DataView(e));
        if (this.pipeControlHandler_.maybeHandleMessage(t, e))
            return;
        const o = this.endpoints_.get(t.interfaceId);
        o ? o.onMessageReceived(t, e, n) : console.error(`Received message for unknown endpoint ${t.interfaceId}`)
    }
    onError_() {
        for (const e of this.endpoints_.values())
            e.onError();
        this.endpoints_.clear()
    }
    onPeerEndpointClosed_(e) {
        const n = this.endpoints_.get(e);
        n && n.onError()
    }
}
,
mojo.internal.interfaceSupport.EndpointClient = class {
    onMessageReceived(e, n, t, o) {}
    onError(e, n=void 0) {}
}
,
mojo.internal.interfaceSupport.Endpoint = class {
    constructor(e=null, n=0) {
        this.router_ = e,
        this.interfaceId_ = n,
        this.controlMessageHandler_ = new mojo.internal.interfaceSupport.ControlMessageHandler(this),
        this.client_ = null,
        this.nextRequestId_ = 0,
        this.localPeer_ = null
    }
    static createAssociatedPair() {
        const e = new mojo.internal.interfaceSupport.Endpoint
          , n = new mojo.internal.interfaceSupport.Endpoint;
        return n.localPeer_ = e,
        e.localPeer_ = n,
        {
            endpoint0: e,
            endpoint1: n
        }
    }
    get router() {
        return this.router_
    }
    isPrimary() {
        return null !== this.router_ && 0 === this.interfaceId_
    }
    releasePipe() {
        return console.assert(this.isPrimary(), "secondary endpoint cannot release pipe"),
        this.router_.pipe
    }
    get isPendingAssociation() {
        return null !== this.localPeer_
    }
    bindInBrowser(e, n) {
        console.assert(this.isPrimary() && !this.router_.isReading(), "endpoint is either associated or already bound"),
        Mojo.bindInterface(e, this.router_.pipe, n)
    }
    associatePeerOfOutgoingEndpoint(e) {
        console.assert(this.router_, "cannot associate with unbound endpoint");
        const n = e.localPeer_;
        e.localPeer_ = n.localPeer_ = null;
        const t = this.router_.generateInterfaceId();
        return n.router_ = this.router_,
        n.interfaceId_ = t,
        n.client_ && this.router_.addEndpoint(n, t),
        t
    }
    generateRequestId() {
        const e = this.nextRequestId_++;
        return this.nextRequestId_ > 4294967295 && (this.nextRequestId_ = 0),
        e
    }
    send(e, n, t, o, i) {
        const r = new mojo.internal.Message(this,this.interfaceId_,t,e,n,o.$.structSpec,i);
        console.assert(this.router_, "cannot send message on unassociated unbound endpoint"),
        this.router_.send(r)
    }
    start(e) {
        console.assert(!this.client_, "endpoint already started"),
        this.client_ = e,
        this.router_ && this.router_.addEndpoint(this, this.interfaceId_)
    }
    get isStarted() {
        return null !== this.client_
    }
    stop() {
        this.router_ && this.router_.removeEndpoint(this.interfaceId_),
        this.client_ = null,
        this.controlMessageHandler_ = null
    }
    close() {
        this.router_ && this.router.closeEndpoint(this.interfaceId_),
        this.client_ = null,
        this.controlMessageHandler_ = null
    }
    async flushForTesting() {
        return this.controlMessageHandler_.sendRunMessage({
            flushForTesting: {}
        })
    }
    onMessageReceived(e, n, t) {
        console.assert(this.client_, "endpoint has no client");
        this.controlMessageHandler_.maybeHandleControlMessage(e, n) || this.client_.onMessageReceived(this, e, n, t)
    }
    onError() {
        this.client_ && this.client_.onError(this)
    }
}
,
mojo.internal.interfaceSupport.createEndpoint = function(e, n=!1) {
    return void 0 === e.watch ? e : new mojo.internal.interfaceSupport.Endpoint(new mojo.internal.interfaceSupport.Router(e,n),0)
}
,
mojo.internal.interfaceSupport.getEndpointForReceiver = function(e) {
    return mojo.internal.interfaceSupport.createEndpoint(e)
}
,
mojo.internal.interfaceSupport.bind = function(e, n, t) {
    e.bindInBrowser(n, t)
}
,
mojo.internal.interfaceSupport.PipeControlMessageHandler = class {
    constructor(e, n) {
        this.router_ = e,
        this.onDisconnect_ = n
    }
    send(e) {
        const n = new mojo.internal.Message(null,4294967295,0,mojo.pipeControl.RUN_OR_CLOSE_PIPE_MESSAGE_ID,0,mojo.pipeControl.RunOrClosePipeMessageParamsSpec.$.$.structSpec,{
            input: e
        });
        this.router_.send(n)
    }
    maybeHandleMessage(e, n) {
        if (e.ordinal !== mojo.pipeControl.RUN_OR_CLOSE_PIPE_MESSAGE_ID)
            return !1;
        const t = new DataView(n,e.headerSize)
          , o = new mojo.internal.Decoder(t,[])
          , i = mojo.pipeControl.RunOrClosePipeMessageParamsSpec.$.$.structSpec
          , r = o.decodeStructInline(i).input;
        return !r.hasOwnProperty("peerAssociatedEndpointClosedEvent") || (this.onDisconnect_(r.peerAssociatedEndpointClosedEvent.id),
        !0)
    }
    notifyEndpointClosed(e) {
        this.send({
            peerAssociatedEndpointClosedEvent: {
                id: e
            }
        })
    }
}
,
mojo.internal.interfaceSupport.ControlMessageHandler = class {
    constructor(e) {
        this.endpoint_ = e,
        this.pendingFlushResolvers_ = new Map
    }
    sendRunMessage(e) {
        const n = this.endpoint_.generateRequestId();
        return new Promise((t=>{
            this.endpoint_.send(mojo.interfaceControl.RUN_MESSAGE_ID, n, mojo.internal.kMessageFlagExpectsResponse, mojo.interfaceControl.RunMessageParamsSpec.$, {
                input: e
            }),
            this.pendingFlushResolvers_.set(n, t)
        }
        ))
    }
    maybeHandleControlMessage(e, n) {
        if (e.ordinal === mojo.interfaceControl.RUN_MESSAGE_ID) {
            const t = new DataView(n,e.headerSize)
              , o = new mojo.internal.Decoder(t,[]);
            return e.flags & mojo.internal.kMessageFlagExpectsResponse ? this.handleRunRequest_(e.requestId, o) : this.handleRunResponse_(e.requestId, o)
        }
        return !1
    }
    handleRunRequest_(e, n) {
        return !!n.decodeStructInline(mojo.interfaceControl.RunMessageParamsSpec.$.$.structSpec).input.hasOwnProperty("flushForTesting") && (this.endpoint_.send(mojo.interfaceControl.RUN_MESSAGE_ID, e, mojo.internal.kMessageFlagIsResponse, mojo.interfaceControl.RunResponseMessageParamsSpec.$, {
            output: null
        }),
        !0)
    }
    handleRunResponse_(e, n) {
        const t = this.pendingFlushResolvers_.get(e);
        return !!t && (t(),
        !0)
    }
}
,
mojo.internal.interfaceSupport.PendingResponse,
mojo.internal.interfaceSupport.ConnectionErrorEventRouter = class {
    constructor() {
        this.listeners = new Map,
        this.nextListenerId_ = 0
    }
    addListener(e) {
        const n = ++this.nextListenerId_;
        return this.listeners.set(n, e),
        n
    }
    removeListener(e) {
        return this.listeners.delete(e)
    }
    dispatchErrorEvent() {
        for (const e of this.listeners.values())
            e()
    }
}
,
mojo.internal.interfaceSupport.PendingReceiver = class {
    get handle() {}
}
,
mojo.internal.interfaceSupport.InterfaceRemoteBase = class {
    constructor(e, n=void 0) {
        this.endpoint_ = null,
        this.requestType_ = e,
        this.pendingResponses_ = new Map,
        this.connectionErrorEventRouter_ = new mojo.internal.interfaceSupport.ConnectionErrorEventRouter,
        n && this.bindHandle(n)
    }
    get endpoint() {
        return this.endpoint_
    }
    bindNewPipeAndPassReceiver() {
        let {handle0: e, handle1: n} = Mojo.createMessagePipe();
        return this.bindHandle(e),
        new this.requestType_(mojo.internal.interfaceSupport.createEndpoint(n))
    }
    bindHandle(e) {
        console.assert(!this.endpoint_, "already bound"),
        e = mojo.internal.interfaceSupport.createEndpoint(e, !0),
        this.endpoint_ = e,
        this.endpoint_.start(this),
        this.pendingResponses_ = new Map
    }
    associateAndPassReceiver() {
        console.assert(!this.endpoint_, "cannot associate when already bound");
        const {endpoint0: e, endpoint1: n} = mojo.internal.interfaceSupport.Endpoint.createAssociatedPair();
        return this.bindHandle(e),
        new this.requestType_(n)
    }
    unbind() {
        if (!this.endpoint_)
            return null;
        const e = this.endpoint_;
        return this.endpoint_ = null,
        e.stop(),
        e
    }
    close() {
        this.cleanupAndFlushPendingResponses_("Message pipe closed."),
        this.endpoint_ && this.endpoint_.close(),
        this.endpoint_ = null
    }
    getConnectionErrorEventRouter() {
        return this.connectionErrorEventRouter_
    }
    sendMessage(e, n, t, o) {
        if (t && (!this.endpoint_ || !this.endpoint_.isStarted))
            return Promise.reject(new Error("The pipe has already been closed."));
        const i = {};
        let r = 0;
        n.$.structSpec.fields.forEach(((e,n)=>{
            const t = n - r;
            if (!mojo.internal.isNullableValueKindField(e))
                return void (i[e.name] = o[t]);
            const s = e.nullableValueKindProperties;
            s.isPrimary && (r++,
            i[s.originalFieldName] = o[t])
        }
        ));
        const s = this.endpoint_.generateRequestId();
        if (this.endpoint_.send(e, s, t ? mojo.internal.kMessageFlagExpectsResponse : 0, n, i),
        !t)
            return Promise.resolve();
        const a = t;
        return new Promise(((n,t)=>{
            this.pendingResponses_.set(s, {
                requestId: s,
                ordinal: e,
                responseStruct: a,
                resolve: n,
                reject: t
            })
        }
        ))
    }
    flushForTesting() {
        return this.endpoint_.flushForTesting()
    }
    onMessageReceived(e, n, t, o) {
        if (!(n.flags & mojo.internal.kMessageFlagIsResponse) || n.flags & mojo.internal.kMessageFlagExpectsResponse)
            return this.onError(e, "Received unexpected request message");
        const i = this.pendingResponses_.get(n.requestId);
        if (this.pendingResponses_.delete(n.requestId),
        !i)
            return this.onError(e, "Received unexpected response message");
        const r = new mojo.internal.Decoder(new DataView(t,n.headerSize),o,{
            endpoint: e
        }).decodeStructInline(i.responseStruct.$.structSpec);
        return r ? n.ordinal !== i.ordinal ? this.onError(e, "Received malformed response message") : void i.resolve(r) : this.onError(e, "Received malformed response message")
    }
    onError(e, n=void 0) {
        this.cleanupAndFlushPendingResponses_(n),
        this.connectionErrorEventRouter_.dispatchErrorEvent()
    }
    cleanupAndFlushPendingResponses_(e=void 0) {
        this.endpoint_ && this.endpoint_.stop();
        for (const n of this.pendingResponses_.keys())
            this.pendingResponses_.get(n).reject(new Error(e));
        this.pendingResponses_ = new Map
    }
}
,
mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper = class {
    constructor(e) {
        this.remote_ = e
    }
    bindNewPipeAndPassReceiver() {
        return this.remote_.bindNewPipeAndPassReceiver()
    }
    associateAndPassReceiver() {
        return this.remote_.associateAndPassReceiver()
    }
    isBound() {
        return null !== this.remote_.endpoint_
    }
    close() {
        this.remote_.close()
    }
    flushForTesting() {
        return this.remote_.flushForTesting()
    }
}
,
mojo.internal.interfaceSupport.CallbackRouter = class {
    constructor() {
        this.removeCallbacks = new Map,
        this.nextListenerId_ = 0
    }
    getNextId() {
        return ++this.nextListenerId_
    }
    removeListener(e) {
        return this.removeCallbacks.get(e)(),
        this.removeCallbacks.delete(e)
    }
}
,
mojo.internal.interfaceSupport.InterfaceCallbackReceiver = class {
    constructor(e) {
        this.listeners_ = new Map,
        this.callbackRouter_ = e
    }
    addListener(e) {
        const n = this.callbackRouter_.getNextId();
        return this.listeners_.set(n, e),
        this.callbackRouter_.removeCallbacks.set(n, (()=>this.listeners_.delete(n))),
        n
    }
    createReceiverHandler(e) {
        return e ? this.dispatchWithResponse_.bind(this) : this.dispatch_.bind(this)
    }
    dispatch_(e) {
        const n = Array.from(arguments);
        this.listeners_.forEach((e=>e.apply(null, n)))
    }
    dispatchWithResponse_(e) {
        const n = Array.from(arguments)
          , t = Array.from(this.listeners_.values()).map((e=>e.apply(null, n)));
        let o;
        for (const e of t)
            if (void 0 !== e) {
                if (void 0 !== o)
                    throw new Error("Multiple listeners attempted to reply to a message");
                o = e
            }
        return o
    }
}
,
mojo.internal.interfaceSupport.MessageHandler,
mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal = class {
    constructor(e) {
        this.endpoints_ = new Set,
        this.remoteType_ = e,
        this.messageHandlers_ = new Map,
        this.connectionErrorEventRouter_ = new mojo.internal.interfaceSupport.ConnectionErrorEventRouter
    }
    registerHandler(e, n, t, o) {
        this.messageHandlers_.set(e, {
            paramStruct: n,
            responseStruct: t,
            handler: o
        })
    }
    bindHandle(e) {
        e = mojo.internal.interfaceSupport.createEndpoint(e),
        this.endpoints_.add(e),
        e.start(this)
    }
    bindNewPipeAndPassRemote() {
        let e = new this.remoteType_;
        return this.bindHandle(e.$.bindNewPipeAndPassReceiver().handle),
        e
    }
    associateAndPassRemote() {
        const {endpoint0: e, endpoint1: n} = mojo.internal.interfaceSupport.Endpoint.createAssociatedPair();
        return this.bindHandle(e),
        new this.remoteType_(n)
    }
    closeBindings() {
        for (const e of this.endpoints_)
            e.close();
        this.endpoints_.clear()
    }
    getConnectionErrorEventRouter() {
        return this.connectionErrorEventRouter_
    }
    async flush() {
        for (let e of this.endpoints_)
            await e.flushForTesting()
    }
    onMessageReceived(e, n, t, o) {
        if (n.flags & mojo.internal.kMessageFlagIsResponse)
            throw new Error("Received unexpected response on interface receiver");
        const i = this.messageHandlers_.get(n.ordinal);
        if (!i)
            throw new Error("Received unknown message");
        const r = new mojo.internal.Decoder(new DataView(t,n.headerSize),o,{
            endpoint: e
        }).decodeStructInline(i.paramStruct.$.structSpec);
        if (!r)
            throw new Error("Received malformed message");
        const s = [];
        for (const e of i.paramStruct.$.structSpec.fields) {
            if (!mojo.internal.isNullableValueKindField(e)) {
                s.push(r[e.name]);
                continue
            }
            const n = e.nullableValueKindProperties;
            n.isPrimary && s.push(r[n.originalFieldName])
        }
        let a = i.handler.apply(null, s);
        if (i.responseStruct) {
            if (void 0 === a)
                throw this.onError(e),
                new Error("Message expects a reply but its handler did not provide one.");
            "object" == typeof a && "Promise" == a.constructor.name || (a = Promise.resolve(a)),
            a.then((t=>{
                e.send(n.ordinal, n.requestId, mojo.internal.kMessageFlagIsResponse, i.responseStruct, t)
            }
            )).catch((()=>{
                this.onError(e)
            }
            ))
        }
    }
    onError(e, n=void 0) {
        this.endpoints_.delete(e),
        e.close(),
        this.connectionErrorEventRouter_.dispatchErrorEvent()
    }
}
,
mojo.internal.interfaceSupport.InterfaceReceiverHelper = class {
    constructor(e) {
        this.helper_internal_ = e
    }
    bindHandle(e) {
        this.helper_internal_.bindHandle(e)
    }
    bindNewPipeAndPassRemote() {
        return this.helper_internal_.bindNewPipeAndPassRemote()
    }
    associateAndPassRemote() {
        return this.helper_internal_.associateAndPassRemote()
    }
    close() {
        this.helper_internal_.closeBindings()
    }
    flush() {
        return this.helper_internal_.flush()
    }
}
,
mojo.internal.interfaceSupport.HandleReader = class {
    constructor(e) {
        this.handle_ = e,
        this.onRead = null,
        this.onError = ()=>{}
        ,
        this.watcher_ = null
    }
    isStopped() {
        return null === this.watcher_
    }
    start() {
        this.watcher_ = this.handle_.watch({
            readable: !0
        }, this.read_.bind(this))
    }
    stop() {
        this.watcher_ && (this.watcher_.cancel(),
        this.watcher_ = null)
    }
    stopAndCloseHandle() {
        this.watcher_ && this.stop(),
        this.handle_.close()
    }
    read_(e) {
        for (; ; ) {
            if (!this.watcher_)
                return;
            const e = this.handle_.readMessage();
            if (e.result == Mojo.RESULT_SHOULD_WAIT)
                return;
            if (e.result == Mojo.RESULT_FAILED_PRECONDITION)
                return void this.onError();
            if (e.result != Mojo.RESULT_OK)
                throw new Error("Unexpected error on HandleReader: " + e.result);
            this.onRead(e.buffer, e.handles)
        }
    }
}
;
export {mojo};
