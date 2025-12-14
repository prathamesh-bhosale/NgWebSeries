# Migration Plan: Legacy Angular 10 to Angular 21 (Modern)

## Overview

This document outlines the strategy to upgrade the `NgWebSeries` application from Angular 10 to the latest Angular version (Angular 21) using the `modern-app` workspace.

## Strategy: Clean Architecture "Strangler Fig" Pattern

Instead of incrementally upgrading `package.json` through 10 major versions (which is prone to "dependency hell"), we will port the code into the fresh `modern-app` structure. This allows us to adopt modern Angular features (Standalone Components, Signals, etc.) immediately.

## Phase 1: Foundation & Configuration

- [x] **Verify `modern-app`**: Ensure the new app runs correctly.
- [x] **Dependencies**: Install necessary libraries (e.g., `bootstrap`, `font-awesome` if used, or ensure vanilla CSS is migrated).
- [x] **Assets**: Copy `src/assets` from legacy to `modern-app/public` (or `src/assets` depending on configuration).
- [x] **Styles**: Migrate global `styles.css`.

## Phase 2: Core Logic Migration (Services & Models)

- [x] **Models**: Copy `src/app/models` to `modern-app/src/app/models`.
- [x] **Services**: Refactor services from `src/app/services`:
  - Convert from Constructor Injection to `inject()` (optional but recommended).
  - Ensure `HttpClient` is provided via `provideHttpClient()` in `app.config.ts`.
  - Update RxJS operators if necessary (v6 -> v7+ syntax is mostly compatible, but imports might change).

## Phase 3: Component Migration (Standalone Architecture)

We will convert `NgModule`-based components to **Standalone Components**.

### 3.1 Common Area

- [ ] `LoginComponent`
- [ ] `HomeComponent`
- [ ] `ContactusComponent`
- [ ] `CommonComponent` (Layout)

### 3.2 Admin Area

- [ ] `AdminComponent` (Layout)
- [ ] `AdmindashboardComponent`
- [ ] `CategoryComponent` (Genres)
- [ ] `LanguageComponent`
- [ ] `MoviesComponent`
- [ ] `SeriesComponent`
- [ ] `EpisodesComponent`

### 3.3 User Area

- [ ] `UserComponent` (Layout)
- [ ] `UserHomeComponent`
- [ ] `MovieListComponent`
- [ ] `MovieDetailsComponent`
- [ ] `SeriesListComponent`
- [ ] `EpisodesListComponent`
- [ ] `KidsComponent`

## Phase 4: Routing & Application Wiring

- [ ] **Routing**: Translate `app-routing.module.ts` to `app.routes.ts`.
- [ ] **Lazy Loading**: Implement lazy loading for `Admin` and `User` routes for better performance.
- [ ] **Bootstrapping**: Ensure `main.ts` bootstraps the app correctly with providers.

## Phase 5: Cleanup

- [ ] Remove legacy code or archive it.
- [ ] verify full functionality.

## Technical Changes Summary

| Feature          | Legacy (v10)                  | Modern (v21)                            |
| :--------------- | :---------------------------- | :-------------------------------------- |
| **Modules**      | `NgModule` (Heavy)            | **Standalone Components** (Lightweight) |
| **HTTP**         | `HttpClientModule`            | `provideHttpClient()`                   |
| **Forms**        | `FormsModule` (Module import) | `FormsModule` (Component import)        |
| **Control Flow** | `*ngIf`, `*ngFor`             | `@if`, `@for` (New Syntax)              |
| **Build Tool**   | Webpack                       | **Esbuild / Vite** (Faster)             |
