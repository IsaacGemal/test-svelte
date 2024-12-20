<script lang="ts">
    let time = $state(0);
    let isRunning = $state(false);
    let interval: ReturnType<typeof setInterval>;

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            interval = setInterval(() => {
                time += 10;
            }, 10);
        }
    }

    function stopTimer() {
        if (isRunning) {
            isRunning = false;
            clearInterval(interval);
        }
    }

    function resetTimer() {
        stopTimer();
        time = 0;
    }

    function formatTime(ms: number) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
</script>

<div class="stopwatch">
    <div class="display">{formatTime(time)}</div>
    <div class="controls">
        {#if !isRunning}
            <button onclick={startTimer}>Start</button>
        {:else}
            <button onclick={stopTimer}>Stop</button>
        {/if}
        <button onclick={resetTimer}>Reset</button>
    </div>
</div>

<style>
    .stopwatch {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        border-radius: 8px;
        background-color: var(--color-bg-1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .display {
        font-family: var(--font-mono);
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--color-theme-1);
    }

    .controls {
        display: flex;
        gap: 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: var(--color-theme-1);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: var(--color-theme-2);
    }
</style> 