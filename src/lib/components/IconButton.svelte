<button class="icon-button" on:click>
    <slot/>
</button>

<style>
    .icon-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        background: transparent;

        & svg, & p {
            fill: rgba(var(--text-color), 0.8);
            color: rgba(var(--text-color), 0.8);
            transition: all ease-in-out 250ms;
            font-size: 15px;
            font-weight: 500;
        }

        &:hover {
            cursor: pointer;
            & svg, & p {
                fill: rgba(var(--text-color), 1);
                color: rgba(var(--text-color), 0.8);
            }
        }
    }
</style>
