import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Colors} from '@/constants/theme';

// the chat interface
function ChatScreen(){
    // 1. get the safe area measurements
    const insets = useSafeAreaInsets();
    // create variables to hold messages as a list of IMessage objects
    const [messages, setMessages] = useState<IMessage[]>([]);
    const {width} = Dimensions.get('window');

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#007AFF', // Your "Provider+" Blue
                        borderBottomRightRadius: 0, // "Tail" effect
                        marginBottom: 5,
                        maxWidth: width * 0.8,
                    },
                    left: {
                        backgroundColor: '#E5E5EA', // Standard Gray
                        borderBottomLeftRadius: 0,
                        marginBottom: 5,
                        maxWidth: width * 0.8,
                    },
                }}
                textStyle={{
                    right: { color: '#fff' }, // White text on Blue
                    left: { color: '#000' },  // Black text on Gray
                }}
            />
        );
    };
    // show the welcome message when the screen loads
    useEffect(() => {
        setMessages([
            {
                _id: 1, // unique ID for this message
                text: "Hello! I am Servy, your Provider+ AssistantHello! I am Servy, your Provider+ AssistantHello! I am Servy, your Provider+ Assistant",
                createdAt: new Date(),
                user:{
                    _id: 2, // ID for the robot
                    name: "AI Agent",
                    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
                },
            },
        ]);
    }, []);

    // what happens when the user sends
    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages(previousMessage => GiftedChat.append(previousMessage, newMessages));
    }, []);

    return (
        // 2. apply padding based on the insets (the actual space left for content on a screen)
        <View style={[
            styles.container,
            {width: '100%'}
        ]}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{_id: 1}}
                renderBubble={renderBubble}
                messagesContainerStyle={{paddingBottom: insets.bottom}}
            />
        </View>
    );
}
// the entire page
export default function App(){

    return(
        <SafeAreaProvider>
            <ChatScreen/>
        </SafeAreaProvider>
    );

}



//STYLES//
const styles = StyleSheet.create({
    container: {
        flex: 1, // take all available space
        backgroundColor: Colors.light.background,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})


