"""
    id(k::Int64) -> SparseMatrixCSC{ℤ₂, Int64}

Generate and return a `k × k` identity-matrix.
"""
function id(k::Int64)::SparseMatrixCSC{ℤ₂, Int64}
    I = sparse(zeros(ℤ₂, k, k))
    for i = 1:k
        I[i,i] = one(ℤ₂)
    end
    return I
end



"""
    anti_id(k::Int64) -> SparseMatrixCSC{ℤ₂, Int64}

Generate and return a `k × k` anti-identity-matrix.
"""
function anti_id(k::Int64)::SparseMatrixCSC{ℤ₂, Int64}
    antiid = ones(ℤ₂, k, k)
    for i = 1:k
        antiid[i,i] = zero(ℤ₂)
    end
    return sparse(antiid)
end