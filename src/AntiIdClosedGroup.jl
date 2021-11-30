module AntiIdClosedGroup

using ClosedGroupFunctions
using Zd_Arithmetics
using SparseArrays
using LinearAlgebra

import Zd_Arithmetics.ℤ₂

export 

    id,
    anti_id,

    po2ai,
    ai2po,
    po2matrix,
    po2latex,
    all_pos2latex,

    first_po,
    next_po,
    construct_generators

include("anti-identity.jl")
include("notation_converters.jl")
include("generators.jl")

end # module
