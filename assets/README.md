# Vesperveil icon

Approved variant: **Golden flower**.

- Six solid, pointed petals around a dark hexagonal center, inspired by the
  floral motif in Ronova's golden eye.
- Open gaps separate the petals; the eye outline and chromatic offsets have
  been removed to improve recognition at small sizes.
- Flat gold: `#D7B77D` (`function` in `src/palette.json`).
- Solid background: `#171316` (`background` in `src/palette.json`).
- The flower is centered with generous margins and no surrounding ornaments.
- Visually reviewed at 32, 64, 128 and 256 px, including a 64 px extension-list
  preview. These are local previews; the live Marketplace has not been reviewed.

`icon.svg` is the editable source, with one path per petal. `icon.png` is an
opaque 512 × 512 raster export referenced by the extension manifest and README.
Export the SVG at that size after editing its paths, preserving its background
and embedded colors. Design settings are recorded in `icon-settings.json`;
they document the icon rather than generate its geometry.
