<template>
    <div id="app">
        <div class="g-pay">
            <div class="tt">
                <van-cell title="单元格" icon="location-o" />
            </div>
        </div>
    </div>
</template>

<script>
    import {Cell,} from "vant"

    export default {
    components: {
        [Cell.name]: Cell,
    },
    data() {
        return {
            msg:"pay"
        }
    }
}
</script>

<style lang="scss" scoped>
   
</style>
