<template>
    <header class="flex justify-center items-center p-4 w-full bg-primary-900 text-accent-100">
        <nav class="flex items-center justify-center w-1/3 max-sm:w-full">
            <ul class="flex flex-row w-full items-center justify-between max-sm:flex-col list-none">
                <HeaderLink url="/" content="Jan Walenda"/>
                <HeaderLink url="/linkedin" content="Linkedin"/>
            </ul>
        </nav>
    </header>
    <slot />
    <footer class="bg-primary-50">
        <p>© 2025 Jan Walenda</p>
    </footer>
</template>