push!(LOAD_PATH,"../src/")

using Documenter, AntiIdClosedGroup

makedocs(
    sitename="AntiIdClosedGroup.jl",
    authors = "Felix Höddinghaus",
    pages = [
        "index.md",
        "anti-identity.md",
        "notation.md",
        "generators.md",
        "permutations.md",
        "conjugacy-invariants.md",
        "example.md",
    ],
)

# show documentation locally after generating with 
#   python3 -m http.server --bind localhost