import { Dispatch } from "react";
import { ChatStateType } from "../types/chat";
import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { ChatIcon, LinkIcon } from "@chakra-ui/icons";

const Option = ({
  title,
  description,
  buttonTitle,
  type = "link",
  url,
  state,
  updateState,
  large = false,
}: {
  title: string;
  description: string;
  buttonTitle: string;
  type?: string;
  url?: string;
  state: ChatStateType;
  updateState: Dispatch<ChatStateType>;
  large?: boolean;
}) => (
  <Flex
    width={`${large ? "220px" : "185px"}`}
    height={`${large ? "220px" : "185px"}`}
    background="rgba(255, 255, 255, 0.06)"
    border={`${large ? "2px" : "1px"} solid rgba(255, 255, 255, 0.4)`}
    cursor={"pointer"}
    flexDir={"column"}
    justifyContent={"space-around"}
    p={"10px"}
    color="white"
    textAlign={"center"}
    borderRadius={"10px"}
    _hover={{
      w: large ? "240px" : "200px",
      h: large ? "240px" : "200px",
      fontSize: large ? "20px" : "18px",
      transition: "all 0.2s ease-in-out",
    }}
  >
    <Text fontWeight={"700"} fontSize={"19px"}>
      {type !== "link" && <ChatIcon mr={"10px"} />}
      {type === "link" && <LinkIcon mr={"10px"} />}
      {title}
    </Text>
    <Text color={"rgba(255,255,255,0.7)"}>{description}</Text>
    <Button
      backgroundColor={"#853bce"}
      color={"white"}
      width="140px"
      alignSelf={"center"}
      shadow={"xl"}
      _hover={{ bg: "#6417b2" }}
      onClick={() => {
        if (!url) {
          updateState({ ...state, mode: "chat" });
        } else {
          window.open(url, "_blank");
        }
      }}
    >
      {buttonTitle}
    </Button>
  </Flex>
);

const Options = ({
  state,
  updateState,
}: {
  state: ChatStateType;
  updateState: Dispatch<ChatStateType>;
}) => (
  <Flex
    width="700px"
    height={"300px"}
    justifyContent={"space-between"}
    alignItems={"center"}
  >
    <Option
      title="Github"
      description="View the code"
      buttonTitle="Visit"
      url="http://google.com"
      state={state}
      updateState={updateState}
    />
    <Option
      title="Chatbot"
      description="Try it out"
      buttonTitle="Start"
      type="code"
      state={state}
      updateState={updateState}
      large
    />
    <Option
      title="Medium"
      description="Read the article"
      buttonTitle="Read"
      url="http://google.com"
      state={state}
      updateState={updateState}
    />
  </Flex>
);

export const Start = ({
  state,
  updateState,
}: {
  state: ChatStateType;
  updateState: Dispatch<ChatStateType>;
}) => {
  return (
    <Flex flexDir={"column"} justifyContent={"space-around"}>
      <Box>
        <Text
          color={"white"}
          width="100%"
          fontSize={"40px"}
          textAlign={"center"}
          fontWeight={"700"}
        >
          Personal Chatbot Example
        </Text>
        <Text
          color={"white"}
          width="100%"
          fontSize={"20px"}
          textAlign={"center"}
          fontWeight={"500"}
          mt="30px"
        >
          What would you like to do?{" "}
        </Text>
      </Box>
      <Options state={state} updateState={updateState} />
    </Flex>
  );
};
