<script>
    import {blur} from "svelte/transition";
    import X from 'phosphor-svelte/lib/X'
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()
</script>

<div class="modal" in:blur={{duration: 250}} out:blur={{duration: 250}}>
    <div class="content">
        <div class="close" on:click={() => dispatch('close')}>
            <X size="{25}" color="var(--pop-up-text-color)" />
        </div>
        <div class="wrapper">
            <slot/>
        </div>
    </div>
</div>

<style>
    .modal {
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-content: center;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(0, 0, 0, 0.4);
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        width: 60%;
        gap: 30px;
        padding: 30px;
        border-radius: 12px;
        background: var(--pop-up-background);

        @media screen and (min-width: 800px) {
            & {
                max-width: 300px;
            }
        }

        @media screen and (max-width: 400px) {
            & {
                width: 80%;
            }
        }

        & svg {
            fill: var(--pop-up-text-color);
            transition: all ease-in-out 250ms;

            &:hover {
                cursor: pointer;
                fill: var(--pop-up-close-hover-color);
            }
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 30px;

        & p {
            font-size: 14px;
            font-weight: 400;
            color: var(--pop-up-text-color);
        }

        & button {
            font-size: 14px;
        }
    }
</style>
