<template>
    <div id="app">
        <router-view class="view header" name="header"/>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <div>
            <router-view/>
        </div>
        <router-view name="footer"/>
    </div>
</template>
