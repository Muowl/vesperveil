import java.util.List;

public class Sample {
    record Theme(String name, double contrast) {
        boolean isReadable() {
            // Comments are the only italic category.
            return contrast >= 4.5;
        }
    }

    public static void main(String[] args) {
        var themes = List.of(new Theme("Vesperveil", 14.02));
        themes.stream()
            .filter(Theme::isReadable)
            .forEach(theme -> System.out.println(theme.name()));
    }
}
