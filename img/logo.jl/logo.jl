using Colors
using Luxor

julia_red    = Colors.JULIA_LOGO_COLORS.red
julia_green  = Colors.JULIA_LOGO_COLORS.green
julia_purple = Colors.JULIA_LOGO_COLORS.purple
julia_blue   = Colors.JULIA_LOGO_COLORS.blue

filepath = abspath(@__DIR__(), "../logo.png")

function drawlogo()
    # Upper triangle (folded)
    setcolor(julia_red)
    poly([
        Point( -60,  -80),
        Point(-160, -150),
        Point(-160,  -10)
    ], :fill)

    # Lower triangle (unfolded)
    setcolor(julia_blue)
    poly([
        Point(-110, 130),
        Point(-180,  30),
        Point( -40,  30)
    ], :fill)

    # Upper rectangle
    setcolor(julia_green)
    box(Point(80, -80), 200, 120, :fill)

    # Lower rectangle
    setcolor(julia_purple)
    box(Point(80, 80), 200, 120, :fill)
end

Drawing(256, 256, filepath)
origin()
background("transparent")
scale(256/400)
drawlogo()
finish()
preview()
