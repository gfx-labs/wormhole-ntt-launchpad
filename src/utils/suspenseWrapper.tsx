import { type ComponentType, type JSX, type ReactNode, Suspense } from 'react'

import { GeneralMessage, GeneralMessageDialog, Spinner } from '@bootnodedev/db-ui-toolkit'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary, type ErrorBoundaryPropsWithRender } from 'react-error-boundary'

import { PrimaryButton } from '@/src/components/sharedComponents/ui/Buttons'

export type DefaultFallbackFormat = 'dialog' | 'default'

export type WithSuspenseProps = {
  defaultFallbackFormat?: DefaultFallbackFormat
  errorFallback?: ReactNode
  suspenseFallback?: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
const DefaultFallback = (): JSX.Element => (
  <Spinner
    height="40"
    style={{ margin: 'auto' }}
    width="40"
  />
)

/**
 * A generic wrapper for all the components that use suspense
 *
 * @param WrappedComponent - a component that will be wrapped inside ErrorBoundary and Suspense
 * @param {ReactNode} [errorFallback] - a custom fallback for ErrorBoundary
 * @param {ReactNode} [suspenseFallback] - a custom fallback for Suspense
 * @param {DefaultFallbackFormat} [defaultFallbackFormat] - Optional. Can be a dialog or just text or custom component (default).
 * @returns {ComponentType}
 */
export const withSuspense = <WrappedProps extends object>(
  WrappedComponent: ComponentType<WrappedProps>,
): ComponentType<WrappedProps & WithSuspenseProps> => {
  return function SuspenseWrapper({
    defaultFallbackFormat = 'default',
    errorFallback,
    suspenseFallback,
    ...restProps
  }: WithSuspenseProps & WrappedProps) {
    const errorMessage = errorFallback ? errorFallback : 'Something went wrong...'

    const fallbackRenderers = {
      default: <>{errorMessage}</>,
      dialog: <GeneralMessageDialog message={<span>{errorMessage}</span>} />,
    }

    const fallback = fallbackRenderers[defaultFallbackFormat] ?? null

    return (
      <ErrorBoundary fallback={fallback}>
        <Suspense fallback={suspenseFallback ?? <DefaultFallback />}>
          <WrappedComponent {...(restProps as WrappedProps)} />
        </Suspense>
      </ErrorBoundary>
    )
  }
}

/**
 * Default fallback render for ErrorBoundary
 *
 * @param {Error} error - the error object
 * @param {Function} resetErrorBoundary - a function to reset the error boundary
 * @returns {ReactNode}
 */
const defaultFallbackRender: ErrorBoundaryPropsWithRender['fallbackRender'] = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) => (
  <GeneralMessage
    actionButton={
      <PrimaryButton
        type="button"
        onClick={resetErrorBoundary}
      >
        Try again
      </PrimaryButton>
    }
    message={error.message}
    style={{ margin: 'auto' }}
  />
)

/**
 * Default reset for ErrorBoundary shown on a dialog
 *
 * @param {Error} error - the error object
 * @param {Function} resetErrorBoundary - a function to reset the error boundary
 * @returns {ReactNode}
 */
const defaultFallbackRenderDialog: ErrorBoundaryPropsWithRender['fallbackRender'] = ({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) => (
  <GeneralMessageDialog
    actionButton={<PrimaryButton onClick={resetErrorBoundary}>Try again</PrimaryButton>}
    message={error.message}
  />
)

export type WithSuspenseAndRetryProps = {
  fallbackRender?: ErrorBoundaryPropsWithRender['fallbackRender']
  suspenseFallback?: ReactNode
  defaultFallbackFormat?: DefaultFallbackFormat
}

/**
 * A wrapper for a component that uses suspense, with the capacity to retry if a useSuspenseQuery fails
 *
 * @param WrappedComponent - a component wrapped inside a tanstack's QueryErrorResetBoundary, ErrorBoundary, and a Suspense
 * @param {ReactNode} [fallbackRender] - a custom fallback render for ErrorBoundary
 * @param {DefaultFallbackFormat} [defaultFallbackFormat] - Optional. Can be a dialog or just text (default). Has no effect if `fallbackRender` is provided
 * @param {ReactNode} [suspenseFallback] - a custom fallback for Suspense
 * @returns {ComponentType}
 */
export const withSuspenseAndRetry = <WrappedProps extends object>(
  WrappedComponent: ComponentType<WrappedProps>,
): ComponentType<WrappedProps & WithSuspenseAndRetryProps> => {
  return function SuspenseAndRetryWrapper({
    defaultFallbackFormat = 'default',
    fallbackRender: customFallbackRender,
    suspenseFallback,
    ...restProps
  }: WithSuspenseAndRetryProps & WrappedProps) {
    const fallbackRenderers = {
      customFallbackRender,
      dialog: defaultFallbackRenderDialog,
      default: defaultFallbackRender,
    }

    const fallbackRender =
      fallbackRenderers.customFallbackRender ??
      fallbackRenderers[defaultFallbackFormat] ??
      fallbackRenderers.default

    return (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={fallbackRender}
            onReset={reset}
          >
            <Suspense fallback={suspenseFallback ?? <DefaultFallback />}>
              <WrappedComponent {...(restProps as WrappedProps)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    )
  }
}

type SafeSuspenseProps = {
  children: ReactNode
  defaultFallbackFormat?: DefaultFallbackFormat
  errorFallback?: ReactNode
  suspenseFallback?: ReactNode
  withRetry?: boolean
}

export function SafeSuspense({
  children,
  defaultFallbackFormat = 'default',
  errorFallback,
  suspenseFallback,
  withRetry = false,
}: SafeSuspenseProps) {
  if (withRetry) {
    const fallbackRenderers = {
      dialog: defaultFallbackRenderDialog,
      default: defaultFallbackRender,
    }

    const fallbackRender = fallbackRenderers[defaultFallbackFormat] ?? fallbackRenderers.default

    return (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={fallbackRender}
            onReset={reset}
          >
            <Suspense fallback={suspenseFallback ?? <DefaultFallback />}>{children}</Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    )
  }

  const errorMessage = errorFallback ?? 'Something went wrong...'

  const fallbackRenderers = {
    default: <>{errorMessage}</>,
    dialog: <GeneralMessageDialog message={<span>{errorMessage}</span>} />,
  }

  const fallback = fallbackRenderers[defaultFallbackFormat] ?? null

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={suspenseFallback ?? <DefaultFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
