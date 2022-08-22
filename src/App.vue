<template>
    <div id="app">
        <router-view class="view header" name="header"/>
        <!--<div id="nav">
            router links can go here
        </div>-->
        <div>
            <router-view/>
        </div>
        <router-view name="footer"/>
    </div>
</template>
