import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { FlashMode } from "expo-camera";

const PlantData = () => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [statusSecond, setStatusSecond] = useState({});

  const data = [
    {
      name: "Tomato",
      content:
        "Tomato is a tropical fruit that is cultivated in tropical climates. Tomatoes are commonly grown in tropical climates.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FTomatoes.jpg?alt=media&token=20e44059-adbb-41a8-8fd7-2f4a1dd5cf20",
    },

    {
      name: "Beetroot",
      content:
        "Sow the seeds 10cm apart, then cover with about 2.5cm of compost. then water it regularly",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FBeetroot.jpg?alt=media&token=d846e42b-7548-4485-a052-05f9b8de14f6",
    },

    {
      name: "Cabbage",
      content:
        "Cabbages are heavy feeders and need a good deal of compost dug into the planting area before planting.Make sure the soil is well-draining, if the roots stand in water, it could cause the head to split and rot.From seed, cabbages take 60-100 days to mature into well formed heads that are ready for harvest.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FCabbagejpg.jpg?alt=media&token=62d9288b-4b17-4ddf-a7d2-31ec0ac76c2d",
    },

    {
      name: "Carrots",
      content:
        "We recommend sowing seeds directly in the garden (or wherever you plan to grow them) rather than transplanting.Carrots do not like to have their roots disturbed. Sow 1/4 inch deep, 2 to 3 inches apart in rows 1 foot apart.Tip: Try to distribute seed in an even fashion so that seeds don't grow together. The best months to grow them is between April and July. Days to Harvest: 55-80 days, depending on variety.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FCarrotsjpg.jpg?alt=media&token=ddab8e42-93a6-43c6-85fa-a344f6ba72b2",
    },

    {
      name: "Potatoes",
      content:
        "Dig straight, shallow trenches, 2 to 3 feet apart, in prepared soil. Plant seed potatoes 12 inches apart, and cover with about 3 inches of soil. When the shoots reach 10 to 12 inches tall, use a hoe or shovel to scoop soil from between rows and mound it against the plants, burying the stems halfway",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FPotatoes.jpg?alt=media&token=1880f78c-f22f-4e47-bb68-7ca263a8a171",
    },

    {
      name: "Oranges",
      content:
        "To grow oranges we need sunlight, water, and good cultural practices such as fertilizers and pruning. Our trees also like about 30 days of 32 degree temperature to help maintain the firmness and freshness of the fruit. The cooler temperatures limit leaf growth aiding in the ripening and longevity of the fruit.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/mypractice-252dc.appspot.com/o/Images%2FOrangesjpg.jpg?alt=media&token=a3d92a3d-427c-4582-a5ad-8dbb765de8e1",
    },
    {
      name: "Lettuce",
      content:
        "Lettuce is a cool-season crop that grows best in temperatures between 45°F and 75°F. It can be grown from seeds or transplants. Plant lettuce in well-drained, fertile soil and keep it consistently moist.",
      image: "https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Lettuce.jpg?alt=media&token=857d2c7c-816f-4a16-b3b9-0567eba8e362",
    },
    {
      name: "Spinach",
      content:
        "Spinach is a nutrient-rich leafy green that thrives in cooler weather. Sow spinach seeds directly in the garden or use transplants. Harvest the outer leaves first, and the plant will continue to produce more leaves.",
      image: "https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Spinach.jpg?alt=media&token=8ce52782-e656-42be-a079-e23c0d3d6672",
    },
    {
      name: "Bell Peppers",
      content:
        "Bell peppers prefer warm temperatures and full sun. Start seeds indoors 8-10 weeks before the last expected frost, and transplant them outside when the soil has warmed up. Peppers need consistent watering and well-drained soil.",
      image: "https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Ball%20peppers.jpg?alt=media&token=57575a98-14e8-4686-b00c-27d4cda1f9cd",
    },
    {
      name: "Cucumbers",
      content:
        "Cucumbers are vining plants that need space to spread. Plant them in a sunny location with well-drained soil. Cucumbers require consistent moisture, especially during flowering and fruiting stages.",
      image: "https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Cucumbers.jpg?alt=media&token=41f43b26-a233-4abb-b70c-d14db20d7dc7",
    },
    {
      name: "Strawberries",
      content:
        "Strawberries can be grown in the ground or in containers. Choose a sunny spot with well-draining soil. Mulch around the plants to suppress weeds and retain moisture. Strawberries need regular watering.",
      image: "https://https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Strawberries.jpg?alt=media&token=290527f8-6e5d-44f4-b6e6-83ad98d82971.com/strawberries.jpg",
    },
    {
      name: "Blueberries",
      content:
        "Blueberries thrive in acidic soil with a pH between 4.5 and 5.5. They need full sun to produce abundant fruit. Blueberries are shallow-rooted and require consistent watering, especially during dry spells.",
      image: "https://exahttps://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/blueberries.jpg?alt=media&token=2cb2ecba-b58f-4032-bf45-e53ba08bf566mple.com/blueberries.jpg",
    },
    {
      name: "Mint",
      content:
        "Mint is a hardy herb that grows well in pots or in the ground. It prefers partial shade and consistently moist soil. Mint can be invasive, so it's best to grow it in containers to control its spread.",
      image: "https://examfirebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/mint.jpg?alt=media&token=9e595e5c-fe64-40f9-8139-75b45dc56650ple.com/mint.jpg",
    },
    {
      name: "Rosemary",
      content:
        "Rosemary is a drought-tolerant herb that thrives in well-drained soil and full sun. It can be grown in pots or in the ground. Rosemary is a perennial plant and can be harvested throughout the year.",
      image: "https://example.https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/rosemary.jpg?alt=media&token=d9780855-9420-451d-8092-d310671ee7abcom/rosemary.jpg",
    },
    {
      name: "Sunflowers",
      content:
        "Sunflowers are easy to grow from seeds. Plant them in a sunny location with well-drained soil. Sunflowers are heavy feeders, so add compost or fertilizer to the soil before planting.",
      image: "https://exahttps://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/Sunflower.jpeg?alt=media&token=c540952f-732d-415c-99bc-57c3f955096ample.com/sunflowers.jpg",
    },
    {
      name: "Zucchini",
      content:
        "Zucchini is a fast-growing summer squash that thrives in warm temperatures. Plant zucchini seeds or transplants in well-draining soil and full sun. Harvest the zucchini when they are small and tender.",
      image: "https://firebasestorage.googleapis.com/v0/b/planteria-67b79.appspot.com/o/zucchini.jpg?alt=media&token=e1470f22-07e9-4412-a0c8-133f70441666",
    },
  ];

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      {/* <Text style={{marginTop: 25, marginLeft: "auto", marginRight: "auto", fontSize: 19}}>plants Information</Text> */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.plantImage} />
            <Text style={{ fontSize: 20, padding: 8, color: "green" }}>
              {item.name}
            </Text>
            <Text style={{ paddingLeft: 8, paddingRight: 8, paddingBottom: 8 }}>
              {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  plantImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
  container: {
    marginTop: 25,
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#FFFDD0",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default PlantData;
