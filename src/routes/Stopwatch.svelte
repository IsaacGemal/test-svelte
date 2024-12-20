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

<div class="flex flex-col items-center gap-4 p-8 rounded-lg bg-[var(--color-bg-1)] shadow-md">
    <div class="font-mono text-4xl font-bold text-[var(--color-theme-1)]">
        {formatTime(time)}
    </div>
    <div class="flex gap-2">
        {#if !isRunning}
            <button 
                class="px-4 py-2 font-bold text-white rounded bg-[var(--color-theme-1)] hover:bg-[var(--color-theme-2)] transition-colors cursor-pointer"
                onclick={startTimer}>
                Start
            </button>
        {:else}
            <button 
                class="px-4 py-2 font-bold text-white rounded bg-[var(--color-theme-1)] hover:bg-[var(--color-theme-2)] transition-colors cursor-pointer"
                onclick={stopTimer}>
                Stop
            </button>
        {/if}
        <button 
            class="px-4 py-2 font-bold text-white rounded bg-[var(--color-theme-1)] hover:bg-[var(--color-theme-2)] transition-colors cursor-pointer"
            onclick={resetTimer}>
            Reset
        </button>
    </div>
</div> 