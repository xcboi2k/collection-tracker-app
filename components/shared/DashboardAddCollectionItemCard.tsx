import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@/components/common/Icon'

export default function DashboardAddCollectionItemCard({
    navigation,
    hasData,
}) {
    return (
        <View className="w-full mt-3 mb-6 bg-primary-100/10 border border-primary-100/20 rounded-3xl p-5 flex-row items-center shadow-sm">
            {/* LEFT: Content */}
            <View className="flex-1 pr-4">
                <Text className="text-xl font-bold text-gray-900">
                    {hasData
                        ? 'Add New Collection Item'
                        : 'Start Your Collection'}
                </Text>

                <Text className="text-xs text-gray-500 mt-1 leading-4">
                    {hasData
                        ? 'Keep tracking your valuable items and insights in one place'
                        : 'Begin your journey by adding your first collection item'}
                </Text>

                {/* CTA Button */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('CollectionAdd')}
                    className="mt-4 bg-primary-100 px-5 py-2.5 rounded-xl self-start active:scale-95"
                >
                    <Text className="text-white font-semibold text-xs">
                        Add Collection Item
                    </Text>
                </TouchableOpacity>
            </View>

            {/* RIGHT: Visual accent (optional but HIGH impact) */}
            <View className="w-[70px] h-[70px] rounded-full bg-primary-100/20 items-center justify-center">
                <Text className="text-2xl">📦</Text>
            </View>
        </View>
    )
}
