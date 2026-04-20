import { Picker } from '@react-native-picker/picker'

import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

import colors from '@/assets/themes/colors'

type CustomDropdownProps = {
    data: any // required
    title?: string // optional
    width?: string // optional
    size?: string // optional
    isBold?: boolean // optional
    customColor?: string // optional
    defaultOption?: string // optional
    onValueChange?: (value: string) => void // optional
    selectedValue?: string // optional
    variant?: string // optional with specific values
    errorMessage?: string // optional
}

const Dropdown = ({
    data,
    title,
    width = '100%',
    size = '14px',
    isBold = false,
    customColor = colors.basic.basic1000,
    defaultOption,
    onValueChange,
    selectedValue,
    variant = 'label-value',
    errorMessage,
}: CustomDropdownProps) => {
    const [open, setOpen] = useState(false)

    return (
        <View className={`${width} mb-4`}>
            {/* Title */}
            {title && (
                <Text className="text-[12px] text-black mb-1">{title}</Text>
            )}

            {/* ================= VARIANTS ================= */}

            {/* LABEL - VALUE */}
            {variant === 'label-value' && (
                <>
                    <SelectList
                        setSelected={(val) => onValueChange(val)}
                        data={data}
                        save="value"
                        boxStyles={{
                            backgroundColor: '#ffffff80',
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: customColor,
                            height: 56,
                            alignItems: 'center',
                        }}
                        fontFamily="Poppins-Regular"
                        dropdownStyles={{
                            backgroundColor: '#ffffff80',
                            borderColor: customColor,
                        }}
                        maxHeight={100}
                        search={false}
                    />

                    {errorMessage !== '' && (
                        <Text className="text-[10px] text-red-500 font-medium mt-1">
                            {errorMessage}
                        </Text>
                    )}
                </>
            )}

            {/* NAME - ID PICKER */}
            {variant === 'name-id' && (
                <View
                    className="rounded-lg border-2 bg-white/80"
                    style={{ borderColor: customColor }}
                >
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(val) => onValueChange(val)}
                    >
                        <Picker.Item label="Select a value" value={null} />

                        {data.map((item, index) => (
                            <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.id}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {/* NON-LABEL VALUE */}
            {variant === 'non-label-value' && (
                <SelectList
                    setSelected={(val) => onValueChange(val)}
                    data={data}
                    boxStyles={{
                        backgroundColor: '#ffffff80',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: customColor,
                        height: 56,
                        alignItems: 'center',
                    }}
                    fontFamily="Poppins-Regular"
                    dropdownStyles={{
                        backgroundColor: '#ffffff80',
                        borderColor: customColor,
                    }}
                    maxHeight={100}
                    search={false}
                />
            )}

            {/* PSGC */}
            {variant === 'psgc' && (
                <View
                    className="rounded-lg border-2"
                    style={{ borderColor: customColor }}
                >
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(val) => onValueChange(val)}
                    >
                        {data.map((item, index) => (
                            <Picker.Item
                                key={index}
                                label={item.name}
                                value={item}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {/* LABEL - KEY */}
            {variant === 'label-key' && (
                <SelectList
                    setSelected={(val) => onValueChange(val)}
                    data={data}
                    save="key"
                    boxStyles={{
                        backgroundColor: '#ffffff80',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: customColor,
                        height: 56,
                        alignItems: 'center',
                    }}
                    fontFamily="Poppins-Regular"
                    dropdownStyles={{
                        backgroundColor: '#ffffff80',
                        borderColor: customColor,
                    }}
                    maxHeight={100}
                />
            )}

            {/* LABEL - KEY WITH ERROR */}
            {variant === 'label-key-with-error' && (
                <>
                    <SelectList
                        setSelected={(val) => onValueChange(val)}
                        data={data}
                        save="key"
                        boxStyles={{
                            backgroundColor: '#ffffff80',
                            borderWidth: 2,
                            borderRadius: 8,
                            borderColor: customColor,
                            height: 56,
                            alignItems: 'center',
                        }}
                        fontFamily="Poppins-Regular"
                        dropdownStyles={{
                            backgroundColor: '#ffffff80',
                            borderColor: customColor,
                        }}
                        maxHeight={100}
                        search
                        searchPlaceholder="type here"
                    />

                    <Text className="text-[10px] text-red-500 font-medium mt-1">
                        {errorMessage}
                    </Text>
                </>
            )}
        </View>
    )
}

export default Dropdown
