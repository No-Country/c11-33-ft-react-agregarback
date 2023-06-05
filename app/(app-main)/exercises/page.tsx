import ListExercises from "@/components/exercises/ListExercises";

export default async function Exercises() {
  // TODO ternario para componente
  // const headersList = headers();
  // const fullUrl = headersList.get("referer") || "";
  // const rute = fullUrl.split("/");
  // const path = rute[rute.length - 1];
  return <ListExercises path="exercises" />;
}
