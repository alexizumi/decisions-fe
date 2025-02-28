import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { UserProvider } from "@/contexts/UserContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout() {
  return (
    <SocketProvider>
      <UserProvider>
        <GestureHandlerRootView>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="User" options={{ headerShown: false }} />
              <Stack.Screen name="Decision" options={{ headerShown: false }} />
              <Stack.Screen
                name="DecisionHistory"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewDecisions"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </UserProvider>
    </SocketProvider>
  );
}
