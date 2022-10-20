import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, selectCounter } from "../../store/auth/authSelector";
import { setAuthState, setDecrement, setIncrement } from "../../store/auth/authSlice";

const Auth: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  return (
    <Grid gap={4}>
      <Flex>
        <Button
          onClick={() => dispatch(setAuthState(!authState))
          }
        >
          {authState ? "Logout" : "LogIn"}
        </Button>
    </Flex>
    <Flex alignItems={"center"}>
      <Button
        onClick={() => dispatch(setDecrement(counter))
        }
      >
        MINUS
      </Button>
      <Box mx={2}>{counter}</Box>
      <Button
        onClick={() => dispatch(setIncrement(counter))
        }
      >
        ADD
      </Button>
      
      </Flex>
    </Grid>
  )
};

export default Auth;