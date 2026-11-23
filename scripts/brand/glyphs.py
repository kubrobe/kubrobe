import sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
f = TTFont(sys.argv[1]); w = float(sys.argv[2]); text = sys.argv[3]; track = float(sys.argv[4])
inst = instantiateVariableFont(f, {"wght": w})
gs = inst.getGlyphSet(); cmap = inst.getBestCmap(); upm = inst['head'].unitsPerEm
x = 0; paths = []; minx=None
for ch in text:
    g = cmap[ord(ch)]; glyph = gs[g]
    pen = SVGPathPen(gs); glyph.draw(pen)
    bp = BoundsPen(gs); glyph.draw(bp)
    paths.append({"ch":ch,"x":x,"d":pen.getCommands(),"b":bp.bounds})
    x += glyph.width + track*upm
print(json.dumps({"upm":upm,"adv":x - track*upm,"asc":inst['OS/2'].sCapHeight,"glyphs":paths}))
