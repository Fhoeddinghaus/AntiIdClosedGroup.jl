push!(LOAD_PATH,"../src/")

using Documenter, AntiIdClosedGroup

makedocs(
    sitename="AntiIdClosedGroup.jl",
    authors = "Felix Höddinghaus",
    pages = [
        "index.md",
        "anti-identity.md"
    ],
)

# show documentation locally after generating with 
#   python3 -m http.server --bind localhost