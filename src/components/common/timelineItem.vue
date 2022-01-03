<template>
    <TimelineItem :color="!disabled ? 'green' : 'gray'">
        <div :class="disabled && 'color-gray'">
            <span class="font-600"> {{ username }} </span>&nbsp;
            <em class="color-gray font-12"><Datetime :value="datetime" /></em>
        </div>
        <Status v-if="status" :code="status" style="margin-top: 5px" />
        <em :class="disabled && 'color-gray'">{{ content }}</em>
        <div style="margin-top: 5px">{{ note }}</div>
        <div v-if="!isEmpty(sortChanges)">
            <strong>Thay đổi thông tin nhận hàng từ</strong>
            <div v-if="sortChanges.deliveryGender">
                Giới tính: {{ GENDER[sortChanges.deliveryGender.oldValue].name }}
            </div>
            <div v-if="sortChanges.deliveryPhone">Số điện thoại: {{ sortChanges.deliveryPhone.oldValue }}</div>
            <div v-if="sortChanges.deliveryName">Tên: {{ sortChanges.deliveryName.oldValue }}</div>
            <div v-if="sortChanges.deliveryAddress">
                Địa chỉ:
                {{
                    `${sortChanges.deliveryAddress.noAndStreet.oldValue}, ${sortChanges.deliveryAddress.ward.oldValue}, ${sortChanges.deliveryAddress.district.oldValue}, ${sortChanges.deliveryAddress.province.oldValue}`
                }}
                <div v-if="sortChanges.deliveryAddress.type">
                    - {{ ADDRESS_TYPE[sortChanges.deliveryAddress.type.oldValue].name }}
                </div>
            </div>
            <div v-if="sortChanges.deliveryNote">Ghi chú: {{ sortChanges.deliveryNote.oldValue }}</div>
            <strong>thành</strong>
            <div v-if="sortChanges.deliveryGender">
                Giới tính: {{ GENDER[sortChanges.deliveryGender.newValue].name }}
            </div>
            <div v-if="sortChanges.deliveryPhone">Số điện thoại: {{ sortChanges.deliveryPhone.newValue }}</div>
            <div v-if="sortChanges.deliveryName">Tên: {{ sortChanges.deliveryName.newValue }}</div>
            <div v-if="sortChanges.deliveryAddress">
                Địa chỉ:
                {{
                    `${sortChanges.deliveryAddress.noAndStreet.newValue}, ${sortChanges.deliveryAddress.ward.newValue}, ${sortChanges.deliveryAddress.district.newValue}, ${sortChanges.deliveryAddress.province.newValue}`
                }}
                <div v-if="sortChanges.deliveryAddress.type">
                    - {{ ADDRESS_TYPE[sortChanges.deliveryAddress.type.newValue].name }}
                </div>
            </div>
            <div v-if="sortChanges.deliveryNote">Ghi chú: {{ sortChanges.deliveryNote.newValue }}</div>
        </div>
        <div v-if="dataExtend">
            <span v-if="description === 'Created package'">Tạo kiện hàng</span>
            <span v-else-if="description === 'Delete package'">Xóa kiện hàng</span>
            <span v-else>Kiện hàng</span>
            {{ dataExtend.packageId }}
            <span v-if="dataExtend.packageOperationStatus">
                <Status :code="dataExtend.packageOperationStatus" style="margin-top: 5px" />
            </span>
        </div>
    </TimelineItem>
</template>

<script>
import { Timeline } from 'ant-design-vue';
import Datetime from '@/components/common/datetime.vue';
import Status from '@/components/common/status.vue';
import { GENDER, ADDRESS_TYPE, STATUS } from '@/constants';
import { isEmpty } from 'lodash';

const { Item: TimelineItem } = Timeline;

export default {
    name: 'CommonTimelineItem',
    components: {
        TimelineItem,
        Datetime,
        Status,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        datetime: {
            type: String,
            default: '',
        },
        username: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        note: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: '',
        },
        sortChanges: {
            type: Object,
            default: () => {},
        },
        dataExtend: {
            type: Object,
            default: () => {},
        },
        description: {
            type: String,
            default: '',
        },
    },
    setup() {
        return {
            GENDER,
            ADDRESS_TYPE,
            isEmpty,
            STATUS,
        };
    },
};
</script>
