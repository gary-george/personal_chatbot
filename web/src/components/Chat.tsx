import { Dispatch, RefObject } from "react";
import { Text, Flex, Box, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { ChatStateType, HistoryStateType } from "../types/chat";
import { Search2Icon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";

const callChatAPI = async (
  state: ChatStateType,
  updateState: Dispatch<ChatStateType>,
  history: any,
  updateHistory: any
) => {
  const { text } = state;

  updateState({ ...state, loading: true });

  const { data } = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}v1/in-memory-ai-text`,
    params: { question: text },
  });

  const { question, answer } = data;

  const updatedHistory = [...history, { question, answer }];

  updateHistory(updatedHistory);

  updateState({ ...state, loading: false, text: "" });
};

const avatar1 = `${process.env.REACT_APP_BASE_URL}avatar1.png`;
const avatar2 = `${process.env.REACT_APP_BASE_URL}avatar2.png`;

const Item = ({ item, type }: { item: any; type: string }) => (
  <Flex
    style={{
      alignSelf: type === "question" ? "flex-start" : "flex-end",
      textAlign: type === "question" ? "left" : "right",
      backgroundColor: type === "question" ? "white" : "#9999ff",
      background: type === "question" ? "white" : "rgba(255,255,255,0.04)",
      border: type === "question" ? "unset" : "1px solid rgba(255,255,255,0.6)",
      borderBottomLeftRadius: type === "question" ? "0" : "20px",
      borderBottomRightRadius: type === "question" ? "20px" : "0",
    }}
    padding="15px 10px 15px 15px "
    width="450px"
    borderRadius="20px"
    boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
    height="auto"
    marginBottom="10px"
    justifyItems="stretch"
  >
    {type === "question" && (
      <Box
        backgroundImage={`url(${avatar2})`}
        borderRadius={"100%"}
        p={"2px"}
        mr="10px"
        w="40px"
        h="40px"
        backgroundSize={"cover"}
      />
    )}

    <Text
      style={{
        color: type === "question" ? "#444" : "white",
      }}
      minHeight="50px"
      marginBottom="10px"
      border="0px solid red"
      height="max-content"
      width="100%"
      fontWeight="500"
      fontSize="15px"
    >
      {type === "question" ? `${item?.question} ?` : item?.answer}
      {type === "question" && (
        <span style={{ fontSize: "11px", color: "grey" }}>
          <br />
          Romeo & Juliet
        </span>
      )}
    </Text>

    {type === "answer" && (
      <Box
        backgroundImage={`url(${avatar1})`}
        borderRadius={"100%"}
        p={"2px"}
        ml="10px"
        w="40px"
        h="40px"
        backgroundSize={"cover"}
      />
    )}
  </Flex>
);

const ChatItem = ({ item, i }: { item: any; i: any }) => (
  <Flex
    key={`chat-${i}`}
    style={{
      flexDirection: "column",
      marginBottom: "0px",
      marginTop: i === 0 ? "0" : "0px",
    }}
  >
    <Item item={item} type="question" />
    <Item item={item} type="answer" />
  </Flex>
);

export const ChatInterface = ({
  state,
  updateState,
  history,
  updateHistory,
  bottomRef,
}: {
  state: ChatStateType;
  updateState: Dispatch<ChatStateType>;
  history: HistoryStateType[];
  updateHistory: Dispatch<HistoryStateType[]>;
  bottomRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <Box
      width="100%"
      border="0px blue solid"
      backgroundColor="transparent"
      borderRadius="6px"
      minHeight="500px"
      margin="0"
      padding="20px"
      flexDirection="column"
      justifyContent="space-between"
      color="white"
    >
      <Box marginBottom="10px" width="100%" ml="10px" position={"relative"}>
        <Text
          pos="absolute"
          top="-70px"
          right="0px"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            updateState({ ...state, mode: "start" });
            updateHistory([]);
          }}
        >
          Go Back
        </Text>
        <Text fontSize={"20px"} fontWeight={"600"}>
          Personal Chatbot Example
        </Text>
      </Box>
      {state.loading && (
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          top="0"
          left="0"
          zIndex="99"
          background="rgba(0,0,0,0.2)"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size="xl" />
        </Flex>
      )}
      <Flex
        border="0px solid red"
        padding="10px 25px"
        backgroundColor="transparent"
        height="390px"
        borderRadius="5px"
        flexDirection="column"
        overflow="scroll"
        paddingBottom="20px"
      >
        {history.map((item: any, i: number) => (
          <ChatItem key={`chat-item-${i}`} item={item} i={i} />
        ))}

        {!history?.length && (
          <>
            <Text
              color="#DDD"
              fontWeight="500"
              marginTop="150px"
              width="100%"
              fontSize="20px"
              textAlign="center"
            >
              Ask some questions about Romeo & Juliet 💬 🚀
            </Text>
            <Text w="100%" textAlign={"center"} mt="10px">
              * you could link this to several documents and query for data.
            </Text>
          </>
        )}
        <Box ref={bottomRef} id="scrollToDiv" style={{ height: 1 }} />
      </Flex>

      <Flex
        height="90px"
        marginTop="20px"
        flexDirection="row"
        backgroundColor="white"
        border="0px solid red"
        borderRadius="10px"
      >
        <Textarea
          id="chat-input"
          height="40px"
          border="0px solid red"
          outline="0px"
          marginLeft="8px"
          marginTop="5px"
          marginRight="20px"
          width="100%"
          backgroundColor="white"
          resize="none"
          color="#333366"
          placeholder="Type your question..."
          value={state?.text}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (state?.text === "") return;
              await callChatAPI(state, updateState, history, updateHistory);
            }
          }}
          onChange={(e) => updateState({ ...state, text: e.target.value })}
        />
        <Flex
          style={{
            color: state?.text === "" ? "lightgrey" : "#333366",
          }}
          width="50px"
          border="0px green solid"
          marginRight="10px"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            style={{
              border: ` 1px ${
                state?.text !== "" ? "lightgrey" : "#F9F9F9"
              } solid`,
              cursor: state?.text === "" ? "not-allowed" : "pointer",
              color: state?.text === "" ? "grey" : "#222",
            }}
            borderRadius="100%"
            justifyContent="center"
            alignItems="center"
            width="50px"
            height="50px"
            backgroundColor="#DDD"
            onClick={async () => {
              if (state?.text !== "") {
                await callChatAPI(state, updateState, history, updateHistory);
              }
            }}
          >
            <Search2Icon width={"17px"} height={"17px"} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
