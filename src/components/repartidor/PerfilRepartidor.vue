<template>
   <div class="card ">
    <div class="flex pl-6 pt-5 flex-wrap-reverse md:flex-wrap card-container orange-container" style="max-width: 100%">
        <div class="flex align-items-center justify-content-center bg-orange-400 font-bold text-white m-2 border-round" style="min-width: 40%; min-height: 30%">
        <CardPanel style="width: 25em">
            <template #header>
                <div class="flex align-items-center justify-content-center">
                <img src="../../assets/AvatarRepartidor.png" style="height: 60%; width: 60%;" />
                </div>
            </template>
            <template #title>
                Nombre Del Repartidor:
                 Aqui ira el nombre
            </template>
            <template #subtitle>
                Aqui Ira el RUT: 12345678-9
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template #footer>
                <div class="flex justify-content-center">
                <ButtonComponent class="color justify-content-center"  icon="pi pi-pencil" label="Editar" />
                <ButtonComponent icon="pi pi-trash" label="Borrar" class="color justify-content-center" style="margin-left: .5em" />
                </div>
            </template>
        </CardPanel>
        </div>
        <div class="align-items-center bg-orange-400 font-bold text-white m-2 border-round" style="width: 55%; height: 55%">
            <div >
            <template >
           <h5>Default</h5>
           </template>
        <AccorDion :activeIndex="0">
            <AccordionTab header="Header I">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </AccordionTab>
            <AccordionTab header="Header II">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
            </AccordionTab>
            <AccordionTab header="Header III">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
            </AccordionTab>
        </AccorDion>
</div>


        </div>
            <div class="flex align-items-center justify-content-center bg-orange-400 font-bold text-white m-2 border-round" style="width: 55%; height: 55%">
            3
            </div>
        </div>

</div>
</template>


<script>

export default {
    setup() {
    }
}
</script>
<style lang="scss" scoped>
::v-deep(.color) {
    background: var(--orange-400) !important;
    color: var(--surface-0) !important;
}
.color:hover {
    background: var(--orange-500) !important;
    color: var(--surface-0) !important;
}

</style>
