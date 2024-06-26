import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment-timezone";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const order = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const timeInIsrael = moment()
    .tz("Asia/Jerusalem")
    .format("DD/MM/YYYY HH:mm:ss");
  console.log("israel time-", timeInIsrael);
  const mapView = useRef(null);
  const [coordinates] = useState([
    {
      latitude: 31.2518,
      longitude: 34.7913,
    },
  ]);
  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          backgroundColor: "#fd5c63",
          padding: 10,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Delivery in 25 mins
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            time in israel {timeInIsrael}
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
          HELP
        </Text>
      </View>
      <MapView
        ref={mapView}
        initialRegion={{
          latitude: 31.252973,
          longitude: 34.791462,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: 400 }}
      >
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} />
        ))}
        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[4]}
          strokeWidth={2}
        />
      </MapView>

      <View
        style={{
          height: 320,
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{ fontWeight: "500", fontSize: 17, textAlign: "center" }}
            >
              {params?.name} has accepted your order
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <FontAwesome5
                name="hand-holding-heart"
                size={28}
                color="#fc8019"
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 2,
                    marginBottom: 6,
                  }}
                >
                  Tip your hunger Saviour
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#696969",
                    marginRight: 20,
                    paddingHorizontal: 2,
                  }}
                >
                  לכל הסטודנטים היקרים, רצינו להביע את תודתנו העמוקה על האמון
                  שנתתם לנו. אנו מבינים כי החיים האקדמיים מלווים באתגרים רבים,
                  והכי חשוב לא לאחר להרצאה!! אנחנו כאן בשבילכם לכל שאלה או בקשה
                </Text>
                <Pressable
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(2)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      2₪
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(5)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      borderRadius: 7,
                      // paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        padding: 4,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      5₪
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(10)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      10₪
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
            {tip ? (
              <View>
                <Text
                  style={{
                    color: "#fc8019",
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  please pay {"₪"}
                  {tip} to your delivery agent at the time of delivery
                </Text>
                <TouchableOpacity
                  onPress={() => setTip(0)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "absolute",
                    top: 40,

                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 14, fontWeight: "700" }}
                  >
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        <Pressable onPress={() => router.replace("/(home)")}>
          <Text style={{ fontSize: 15, color: "red" }}>
            Thank you for the invitation, click to return to the homepage{" "}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default order;
