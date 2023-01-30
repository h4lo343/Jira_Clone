import { Raw } from "../types";
import { Select } from "antd";

// 使用react自带utility type获取组件props
type SelectProps = React.ComponentProps<typeof Select>

//进行透传type定义，用omit组件type中已经有的部分
interface IdSelectorProps extends Omit<SelectProps, 'value'|'onChange'|'options'>{
  value: Raw | null | undefined,
  onChange: (value: number) => void,
  defaultOptionName?: string,
  options?: {name: string, id: number}[]
}
export const IdSelector = (props: IdSelectorProps) => {

  // 用restProps接收透传的其他参数
  const {value, onChange, defaultOptionName, options, ...restProps} = props;

  return <Select
    value={options?.length ? toNumber(value) : 0}
    onChange={value => onChange(toNumber(value))}
    {...restProps}
  >
    {
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
    }
  </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);
