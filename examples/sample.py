from dataclasses import dataclass


@dataclass(frozen=True)
class Theme:
    name: str
    contrast: float

    def is_readable(self, minimum: float = 4.5) -> bool:
        # Keep comments quiet, but readable.
        return self.contrast >= minimum


themes = [Theme("Vesperveil", 14.02)]
for theme in themes:
    print(f"{theme.name}: {theme.is_readable()}")
