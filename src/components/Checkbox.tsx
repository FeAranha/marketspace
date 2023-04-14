import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckCircle, Circle } from "phosphor-react-native";
import { Icon, Stack } from "native-base";
import CheckboxSvg from "@assets/checked.svg";

export interface Props extends TouchableOpacityProps {
  checked?: boolean;
  variant?: 'new' | 'used'
}

export function Checkbox({ checked = false, ...rest }: Props) {
  return (
    <Stack m={2}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        activeOpacity={0.7}
        {...rest}
      >
        {checked ? (
           <CheckboxSvg /> 
        ) : (
          <Icon as={<Circle color="#9F9BA1" />} />
        )}
      </TouchableOpacity>
    </Stack>
  );
}
