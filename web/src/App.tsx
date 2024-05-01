import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Start } from "./components/Start";
import { ChatInterface } from "./components/Chat";
import { ChatStateType, HistoryStateType } from "./types/chat";

const defaultState = {
  loading: false,
  isReady: false,
  mode: "start",
  text: "",
};

function App() {
  const [state, updateState] = useState<ChatStateType>(defaultState);
  const [history, updateHistory] = useState<HistoryStateType[]>(
    [] as HistoryStateType[]
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history?.length) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <Box
      m="0"
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-l, #401446, #121937)"
    >
      <Flex
        borderRadius={"20px"}
        width="100%"
        maxW="1000px"
        height="600px"
        background="rgba(255, 255, 255, 0.06)"
        border="2px solid rgba(255, 255, 255, 0.4)"
        justifyContent={"center"}
      >
        {state?.mode === "start" && (
          <Start state={state} updateState={updateState} />
        )}
        {state?.mode === "chat" && (
          <ChatInterface
            state={state}
            updateState={updateState}
            history={history}
            updateHistory={updateHistory}
            bottomRef={bottomRef}
          />
        )}
      </Flex>
    </Box>
  );
}

export default App;
