import java.util.HashMap;
import java.util.Map;

class Rough {
    public static void main(String[] args) {
        System.out.println("Hello World");

        // // List
        // List<String> names = new ArrayList<>();
        // names.add("Murali");
        // names.add("Mohan");
        // names.add("ismail");
        // names.add("deepak");
        // names.add("murali");
        // System.out.println(names.get(0));
        // System.out.println(names.size());
        // System.out.println(names.contains("murali"));

        // for (String name : names) {
        // System.out.println(name);
        // }

        // Set
        // Set<String> names = new HashSet<>();
        // names.add("murali");
        // names.add("murali");
        // System.out.println(names.size());
        // System.out.println(names.contains("murali"));

        // for (String name : names) {
        // System.out.println(name);
        // }

        // Map
        Map<String, String> names = new HashMap<>();
        names.put("name", "murali");
        names.put("age", "25");
        names.put("city", "hyderabad");
        System.out.println(names.get("name"));
        System.out.println(names.size());

        for (Map.Entry<String, String> e : names.entrySet()) {
            System.out.println(e.getKey() + " : " + e.getValue());
        }

    }
}