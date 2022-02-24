<template>
    <div class="ActionArea">
        <Dropdown>
            <template #overlay>
                <Menu @click="handleMenuClick">
                    <MenuItem>
                        <a href="/product/create">
                            <Button type="primary" style="width: 100%">Tạo sản phẩm</Button>
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="/combo/create">
                            <Button type="primary" style="width: 100%">Tạo combo</Button>
                        </a>
                    </MenuItem>
                </Menu>
            </template>
            <Button type="primary">
                Tạo mới
                <DownOutlined />
            </Button>
        </Dropdown>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button, Dropdown, Menu } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';

const { Item: MenuItem } = Menu;

export default defineComponent({
    name: 'ActionArea',
    components: {
        Button,
        Dropdown,
        Menu,
        MenuItem,
        DownOutlined,
    },
    setup() {
        const router = useRouter();
        const createProduct = () => {
            router.push('/product/create');
        };
        return {
            createProduct,
        };
    },
});
</script>

<style lang="scss">
.ActionArea {
    width: fit-content;
    flex: 1;
    justify-content: end;
    text-align: right;

    &--delete {
        margin-right: 1rem;
    }
}
</style>
