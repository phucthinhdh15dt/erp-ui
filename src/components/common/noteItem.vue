<template>
    <div :class="disabled && 'color-gray'">
        <Row>
            <Col :span="23">
                <div>
                    <span class="font-600" :class="disabled && 'color-gray'"> {{ username }} </span>&nbsp;
                    <em class="color-gray font-12"><Datetime :value="datetime" /></em>
                </div>
                <div style="font-600" :class="disabled && 'text-strike'">{{ content }}</div>
            </Col>
            <Col :span="1">
                <DeleteOutlined v-if="!disabled" style="color: red; cursor: pointer" @click="() => unComment(id)" />
            </Col>
        </Row>
    </div>
</template>

<script>
import { Row, Col } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import Datetime from '@/components/common/datetime.vue';

export default {
    name: 'CommonNoteItem',
    components: {
        Datetime,
        Row,
        Col,
        DeleteOutlined,
    },
    props: {
        id: {
            type: Number,
            default: 0,
        },
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
        description: {
            type: String,
            default: '',
        },
        unComment: {
            type: Function,
            default: () => {},
        },
    },
};
</script>
