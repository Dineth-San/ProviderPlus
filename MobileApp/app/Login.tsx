import * as React from "react";
import {Image, StyleSheet, View, Pressable, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation, ParamListBase} from "@react-navigation/native";

const CHatPage = () => {
  	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    		
    		return (
      			<SafeAreaView style={styles.chatPage}>
        				<View style={styles.view}>
          					<Image style={[styles.ellipsisIcon, styles.iconLayout]} resizeMode="cover" />
          					<View style={[styles.child, styles.childLayout]} />
          					<Image style={styles.rightArrowIcon} resizeMode="cover" />
          					<Pressable style={[styles.back, styles.iconLayout]} onPress={() => navigation.goBack()}>
            						<Image style={styles.icon} resizeMode="cover" />
          					</Pressable>
          					<Image style={[styles.forwardArrowIcon, styles.iconLayout]} resizeMode="cover" />
          					<View style={styles.sendMessageWrapper}>
            						<Text style={styles.sendMessage}>Send Message...</Text>
          					</View>
          					<View style={styles.ellipseParent}>
            						<Image style={[styles.frameChild, styles.helloILayout]} resizeMode="cover" />
            						<Text style={[styles.nimal, styles.timeFlexBox]}>Nimal</Text>
            						<Text style={[styles.plumber, styles.timeFlexBox]}>Plumber</Text>
            						<Text style={[styles.online, styles.timeFlexBox]}>Online</Text>
            						<Image style={[styles.frameItem, styles.childLayout]} resizeMode="cover" />
            						<Image style={styles.frameInner} resizeMode="cover" />
          					</View>
          					<View style={[styles.helloICanHelpWithYourPWrapper, styles.wrapperPosition]}>
            						<Text style={[styles.helloI, styles.helloITypo]}>hello ! i can help with your plumbing issue. when are you free ?</Text>
              							</View>
              							<View style={[styles.wrapper, styles.textLayout]}>
                								<Text style={[styles.text, styles.textLayout]}>...</Text>
              							</View>
              							<View style={[styles.hiNimalAreYouAvailibleIWrapper, styles.wrapperPosition]}>
                								<Text style={[styles.hiNimal, styles.helloITypo]}>hi ! nimal are you availible in tomorrow 4 pM?</Text>
                  									</View>
                  									<Image style={styles.sentIcon} resizeMode="cover" />
                  									<Image style={styles.securityShieldIcon} resizeMode="cover" />
                  									<View style={styles.iphoneStatusBar}>
                    										<Image style={[styles.wifiIcon, styles.iconPosition]} resizeMode="cover" />
                    										<Image style={[styles.batteryIcon, styles.iconPosition]} resizeMode="cover" />
                    										<Image style={styles.receptionIcon} resizeMode="cover" />
                    										<Text style={[styles.time, styles.timeFlexBox]}>19:02</Text>
                  									</View>
                  									</View>
                  									</SafeAreaView>);
                								};
                								
                								const styles = StyleSheet.create({
                  									chatPage: {
                    										flex: 1
                  									},
                  									iconLayout: {
                    										height: 32,
                    										width: 32,
                    										top: 62,
                    										position: "absolute"
                  									},
                  									childLayout: {
                    										height: 6,
                    										position: "absolute"
                  									},
                  									helloILayout: {
                    										height: 65,
                    										top: 15
                  									},
                  									timeFlexBox: {
                    										textAlign: "center",
                    										color: "#fff",
                    										position: "absolute"
                  									},
                  									wrapperPosition: {
                    										width: 259,
                    										borderTopRightRadius: 24,
                    										borderTopLeftRadius: 24,
                    										elevation: 18,
                    										boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.25)",
                    										backgroundColor: "rgba(217, 217, 217, 0.2)",
                    										left: "50%",
                    										position: "absolute",
                    										overflow: "hidden"
                  									},
                  									helloITypo: {
                    										width: 214,
                    										fontSize: 16,
                    										left: 23,
                    										fontFamily: "NotoSans-Medium",
                    										fontWeight: "500",
                    										textAlign: "left",
                    										color: "#fff",
                    										textTransform: "capitalize",
                    										position: "absolute"
                  									},
                  									textLayout: {
                    										height: 41,
                    										position: "absolute"
                  									},
                  									iconPosition: {
                    										height: 13,
                    										top: 18,
                    										position: "absolute"
                  									},
                  									view: {
                    										height: 956,
                    										overflow: "hidden",
                    										width: "100%"
                  									},
                  									ellipsisIcon: {
                    										left: 312
                  									},
                  									child: {
                    										marginLeft: -72,
                    										top: 944,
                    										borderStyle: "solid",
                    										borderColor: "#333",
                    										borderTopWidth: 6,
                    										width: 144,
                    										left: "50%"
                  									},
                  									rightArrowIcon: {
                    										top: 632,
                    										left: 2719,
                    										width: 30,
                    										height: 40,
                    										position: "absolute"
                  									},
                  									back: {
                    										left: 32
                  									},
                  									icon: {
                    										height: "100%",
                    										nodeWidth: 32,
                    										nodeHeight: 32,
                    										width: "100%"
                  									},
                  									forwardArrowIcon: {
                    										left: 376
                  									},
                  									sendMessageWrapper: {
                    										top: 851,
                    										left: 27,
                    										height: 70,
                    										width: 386,
                    										backgroundColor: "rgba(217, 217, 217, 0.2)",
                    										borderRadius: 24,
                    										position: "absolute",
                    										overflow: "hidden"
                  									},
                  									sendMessage: {
                    										left: 20,
                    										width: 273,
                    										height: 30,
                    										textAlign: "left",
                    										color: "#fff",
                    										fontFamily: "NotoSans-Regular",
                    										textTransform: "capitalize",
                    										fontSize: 20,
                    										top: 19,
                    										position: "absolute"
                  									},
                  									ellipseParent: {
                    										top: 129,
                    										height: 95,
                    										elevation: 18,
                    										boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.25)",
                    										marginLeft: -193,
                    										width: 386,
                    										backgroundColor: "rgba(217, 217, 217, 0.2)",
                    										borderRadius: 24,
                    										left: "50%",
                    										position: "absolute",
                    										overflow: "hidden"
                  									},
                  									frameChild: {
                    										left: 31,
                    										width: 65,
                    										position: "absolute"
                  									},
                  									nimal: {
                    										top: 20,
                    										left: 113,
                    										fontWeight: "700",
                    										fontFamily: "NotoSans-Bold",
                    										width: 61,
                    										height: 28,
                    										textTransform: "capitalize",
                    										fontSize: 20,
                    										textAlign: "center"
                  									},
                  									plumber: {
                    										top: 46,
                    										left: 117,
                    										fontSize: 13,
                    										width: 53,
                    										height: 18,
                    										fontFamily: "NotoSans-Regular",
                    										textAlign: "center",
                    										textTransform: "capitalize"
                  									},
                  									online: {
                    										top: 67,
                    										left: 133,
                    										fontSize: 10,
                    										width: 31,
                    										height: 15,
                    										fontFamily: "NotoSans-Regular",
                    										textAlign: "center",
                    										textTransform: "capitalize"
                  									},
                  									frameItem: {
                    										top: 71,
                    										left: 123,
                    										width: 6
                  									},
                  									frameInner: {
                    										top: 68,
                    										left: 76,
                    										width: 12,
                    										height: 12,
                    										position: "absolute"
                  									},
                  									helloICanHelpWithYourPWrapper: {
                    										top: 289,
                    										borderBottomRightRadius: 24,
                    										marginLeft: -193,
                    										height: 95
                  									},
                  									helloI: {
                    										height: 65,
                    										top: 15
                  									},
                  									wrapper: {
                    										top: 583,
                    										width: 62,
                    										borderBottomRightRadius: 24,
                    										marginLeft: -193,
                    										height: 41,
                    										borderTopRightRadius: 24,
                    										borderTopLeftRadius: 24,
                    										elevation: 18,
                    										boxShadow: "0px 7px 18px rgba(0, 0, 0, 0.25)",
                    										backgroundColor: "rgba(217, 217, 217, 0.2)",
                    										left: "50%",
                    										overflow: "hidden"
                  									},
                  									text: {
                    										top: -3,
                    										left: 21,
                    										fontSize: 24,
                    										width: 19,
                    										fontFamily: "NotoSans-Medium",
                    										fontWeight: "500",
                    										height: 41,
                    										textAlign: "left",
                    										color: "#fff",
                    										textTransform: "capitalize"
                  									},
                  									hiNimalAreYouAvailibleIWrapper: {
                    										marginLeft: -60,
                    										top: 449,
                    										borderBottomLeftRadius: 24,
                    										height: 69
                  									},
                  									hiNimal: {
                    										top: 13,
                    										height: 43
                  									},
                  									sentIcon: {
                    										top: 867,
                    										left: 354,
                    										width: 38,
                    										height: 38,
                    										position: "absolute"
                  									},
                  									securityShieldIcon: {
                    										top: 159,
                    										left: 349,
                    										width: 36,
                    										height: 36,
                    										position: "absolute"
                  									},
                  									iphoneStatusBar: {
                    										marginLeft: -207,
                    										top: 0,
                    										width: 414,
                    										height: 44,
                    										left: "50%",
                    										position: "absolute",
                    										overflow: "hidden"
                  									},
                  									wifiIcon: {
                    										right: 60,
                    										width: 18
                  									},
                  									batteryIcon: {
                    										right: 27,
                    										width: 27
                  									},
                  									receptionIcon: {
                    										right: 85,
                    										height: 11,
                    										width: 18,
                    										top: 19,
                    										position: "absolute"
                  									},
                  									time: {
                    										top: 16,
                    										left: 39,
                    										fontSize: 18,
                    										letterSpacing: -0.4,
                    										lineHeight: 18,
                    										fontWeight: "600",
                    										fontFamily: "SF Pro Display"
                  									}
                								});
                								
                								export default CHatPage;
                								