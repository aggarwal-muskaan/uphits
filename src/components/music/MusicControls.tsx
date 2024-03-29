import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import ReactHowler from "react-howler";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../../lib/utilFunctions";
import { TSongsTable } from "../../types";

interface Props {
  songs: TSongsTable["songs"][];
  activeSong: TSongsTable["songs"];
}

export const MusicControls = ({ songs, activeSong }: Props) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState<number>(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0); // float value instead of Int
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef: LegacyRef<ReactHowler> = useRef(null);
  const repeatRef = useRef(repeat);
  const [volume, setVolume] = useState(0.8);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId: number;

    if (playing && !isSeeking && soundRef.current) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    () => {
      cancelAnimationFrame(timerId);
    };
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  // shuffle when next, not accounting prev
  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  // repeat on song end, not accounting next button
  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          nextSong();
          return;
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  const VolumeSlider = () => (
    <Flex>
      <IconButton
        outline="none"
        variant="link"
        aria-label="play"
        fontSize="22px"
        color="gray.600"
        icon={volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
      />

      <RangeSlider
        aria-label={["min", "max"]}
        step={0.01}
        id="volume-range"
        min={0}
        max={1}
        onChange={(e) => {
          setVolume(e[0]);
        }}
        value={[volume]}
      >
        <RangeSliderTrack bg="gray.800">
          <RangeSliderFilledTrack bg="gray.600" />
        </RangeSliderTrack>
      </RangeSlider>
    </Flex>
  );

  return (
    <Flex width="100%">
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
          volume={volume}
          html5={true}
          // format=['mp3']
        />
      </Box>

      <Box width="55%" justifySelf="flex-start">
        <Center color="gray.600">
          <ButtonGroup>
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="24px"
              color={shuffle ? "white" : "gray.600"}
              onClick={onShuffle}
              icon={<MdShuffle />}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="skip"
              fontSize="24px"
              icon={<MdSkipPrevious />}
              onClick={prevSong}
            />
            {playing ? (
              <IconButton
                outline="none"
                variant="link"
                aria-label="pause"
                fontSize="40px"
                color="white"
                icon={<MdOutlinePauseCircleFilled />}
                onClick={() => setPlayState(false)}
              />
            ) : (
              <IconButton
                outline="none"
                variant="link"
                aria-label="play"
                fontSize="40px"
                color="white"
                icon={<MdOutlinePlayCircleFilled />}
                onClick={() => setPlayState(true)}
              />
            )}

            <IconButton
              outline="none"
              variant="link"
              aria-label="next"
              fontSize="24px"
              icon={<MdSkipNext />}
              onClick={nextSong}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="repeat"
              fontSize="24px"
              color={repeat ? "white" : "gray.600"}
              onClick={onRepeat}
              icon={<MdOutlineRepeat />}
            />
          </ButtonGroup>
        </Center>

        <Box color="gray.600">
          <Flex justify="center" align="center">
            <Box width="10%">
              <Text fontSize="xs">{formatTime(seek)}</Text>
            </Box>
            <Box width="80%">
              <RangeSlider
                aria-label={["min", "max"]}
                step={0.1}
                min={0}
                id="player-range"
                max={duration ? (duration.toFixed(2) as unknown as number) : 0}
                onChange={onSeek}
                value={[seek]}
                onChangeStart={(e) => {
                  setIsSeeking(true);
                  // console.log("on change start", e);
                }}
                onChangeEnd={(e) => {
                  setIsSeeking(false);
                  // console.log("on change end", e[0], [e]);
                  // setSeek(e[0]);
                }}
              >
                <RangeSliderTrack bg="gray.800">
                  <RangeSliderFilledTrack bg="gray.600" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </Box>
            <Box width="10%" textAlign="right">
              <Text fontSize="xs">{formatTime(duration)}</Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box width="30%" alignSelf="center" pr="35px" ml="auto">
        <VolumeSlider />
      </Box>
    </Flex>
  );
};
