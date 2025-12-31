import { Accessor, Show } from "solid-js";
import { HiOutlineArrowTopRightOnSquare } from "solid-icons/hi";
import { MetaFile } from "~/utils/get-meta-file";
import { Box, Col, Row, Text } from "../Common/styles";
import { PackName } from "./styles";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";

interface PackageInfoProps {
  pack: Accessor<MetaFile>;
}

export default function PackageInfo(props: PackageInfoProps) {
  let containerEl: HTMLDivElement | undefined;
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.1,
    initialValue: true,
  });
  const visible = useVisibilityObserver(() => containerEl);

  return (
    <Box mt="2em" ref={containerEl}>
      <Col justify="center" items="center" sm:justify="flex-start">
        <Show when={props.pack()}>
          <Show when={visible()}>
            <PackName>{props.pack().packName}</PackName>
          </Show>
          <Box mt="1.5em">
            <Row justify="center" items="center">
              <Box mx="0.5em">
                <Text size="1.2em">
                  License: <b>{props.pack().license}</b>
                </Text>
              </Box>
              <Box mx="0.5em">
                <Text color="accent" size="1.2em">
                  <a href={props.pack().url} target="_blank">
                    <Row justify="center" items="center">
                      Repository{" "}
                      <Box ml="0.2em">
                        {" "}
                        <HiOutlineArrowTopRightOnSquare />
                      </Box>
                    </Row>
                  </a>
                </Text>
              </Box>
            </Row>
          </Box>
        </Show>
      </Col>
    </Box>
  );
}
