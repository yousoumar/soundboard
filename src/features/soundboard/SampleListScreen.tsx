import React, { FC } from "react";
import Screen from "../../components/Screen";
import SampleList from "./SampleList";

interface Props {}

const SampleListScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <SampleList />
    </Screen>
  );
};

export default SampleListScreen;
