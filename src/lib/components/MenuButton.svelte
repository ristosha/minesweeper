<script>
    export let primary = false;
</script>

<button class="menu-button" on:click class:primary>
    <slot />
</button>

<style>
    .menu-button {
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-content: center;
        padding: 15px 10px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        transition: all linear 250ms;
        color: rgb(var(--primary-color));
        background: transparent; /*rgba(var(--secondary-color), 0.3);*/
        outline: 1px solid rgba(var(--secondary-color), 1);

        &:hover {
            cursor: pointer;
            background: rgba(var(--secondary-color), 0.5);
        }

        &.primary {
            color: var(--background);
            background: rgba(var(--primary-color), 0.8);

            &:hover {
                background: rgba(var(--primary-color), 1);
            }
        }
    }
</style>
