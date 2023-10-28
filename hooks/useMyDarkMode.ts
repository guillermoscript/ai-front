import { useLocalStorage, useMediaQuery, useUpdateEffect } from 'usehooks-ts'

const COLOR_SCHEME_QUERY = 'data-theme'

interface UseDarkModeOutput {
    isDarkMode: boolean
    toggle: () => void
    enable: () => void
    disable: () => void
}

export function useMyDarkMode(defaultValue?: boolean): UseDarkModeOutput {
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
    const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
        'usehooks-ts-dark-mode',
        defaultValue ?? isDarkOS ?? false,
    )

    // Update darkMode if os prefers changes
    useUpdateEffect(() => {
        setDarkMode(isDarkOS)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkOS])

    return {
        isDarkMode,
        toggle: () => setDarkMode(prev => !prev),
        enable: () => setDarkMode(true),
        disable: () => setDarkMode(false),
    }
}
