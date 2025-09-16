import Banner from "@/components/Banner";
import FoodList from "@/components/FoodList";
import RestaurantTable from "@/components/RestaurantTable";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Banner></Banner>
    <FoodList></FoodList>
    <RestaurantTable></RestaurantTable>
   </div>
  );
}
