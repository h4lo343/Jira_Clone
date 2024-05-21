import { Raw } from "../types";
import { Select } from "antd";
import { useState } from 'react'

// 使用react自带utility type获取组件props
type SelectProps = React.ComponentProps<typeof Select>

//进行透传type定义，用omit组件type中已经有的部分
interface IdSelectorProps extends Omit<SelectProps, 'value'|'onChange'|'options'>{
  value?: Raw | null | undefined;
  onChange?: (value: number) => void,
  defaultOptionName?: string,
  options?: {name: string, id: number | string}[]
}

export const IdSelector = (props: IdSelectorProps) => {
   
  // 用restProps接收透传的其他参数
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  const [people, setPeople] = useState(defaultOptionName)
  console.log(defaultOptionName)
 
  return <Select
    
    value={people}
    onChange={(value) => {
      onChange?.(toNumber(value))
      if(value === 0) {
        setPeople(defaultOptionName)
      }
      else setPeople(options?.length? options[toNumber(value) - 1]?.name : '')
    }}
    {...restProps}
    style = {{width: '13rem'}}
  >
    {defaultOptionName ? (
      <Select.Option value={0}>{defaultOptionName}</Select.Option>
    ) : null}
    {options?.map((option) => (
      <Select.Option key={option.id} value={option.id}>
        {option.name}
      </Select.Option>
    ))}
  </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);
