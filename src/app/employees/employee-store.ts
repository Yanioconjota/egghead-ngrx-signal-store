import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Employee } from '../model';
import { mockEmployees } from './employee.mocks';
import { computed } from '@angular/core';

type EmployeeState = {
  loadedItems: Employee[]
  isLoading: boolean
  error: Error | null
  filters: {
    name: string,
    salary: Record <'from' | 'to', number>
  }
}

const initialState: EmployeeState = {
  loadedItems: mockEmployees,
  isLoading: false,
  error: null,
  filters: {
    name: '',
    salary: {
      from: 0,
      to: 10_000
    }
  }
}

/* * EmployeeStore can be provided in the root module, a specific
 module, a component, a route or a service.
 * This makes it available for dependency injection where needed.
 */

/**
 * This is an example of an NgRx Signal Store, which represents a modern approach to state management in Angular
 * using Signals - Angular's fine-grained reactivity system.
 *
 * Key Concepts:
 * 1. Signals: These are wrappers around values that can notify interested consumers when those values change.
 *    They are the building blocks of Angular's reactive system, replacing RxJS in many scenarios.
 *
 * 2. Signal Store: An NgRx construct that combines multiple features to create a state management solution:
 *    - State management (withState)
 *    - Computed values (withComputed)
 *    - Updates and mutations (not shown in this example)
 *
 * How this store works:
 * - The store maintains a state (EmployeeState) containing:
 *   * loadedItems: Array of employees
 *   * isLoading: Loading state flag
 *   * error: Error handling
 *   * filters: Search and filtering criteria
 *
 * - Computed properties (using withComputed):
 *   * count: Derived state that calculates the total number of employees
 *   * items: Filtered list based on name and salary range
 *
 * Benefits of Signal Store:
 * - Fine-grained reactivity: Only components using specific signals are updated
 * - Type safety: Full TypeScript support
 * - Simpler testing: Signals are easier to test than observables
 * - Better performance: No need for change detection optimization
 *
 * Usage:
 * - Inject this store in components/services using dependency injection
 * - Access state using store.propertyName() syntax
 * - All signals are automatically unwrapped in templates
 */
export const EmployeeStore = signalStore(
  //{ providedIn: 'root' },
  withState(initialState),
  withComputed(({ loadedItems, filters }) => ({
    count: computed(() => loadedItems().length),
    items: computed(() => {
      let result = loadedItems();

      if (filters.name()) {
        const search = filters().name.toLowerCase();
        result = result.filter(e => e.firstName.toLowerCase().includes(search) || e.lastName.toLowerCase().includes(search));
      }

      if (filters.salary.from()) {
        result = result.filter(e => e.salary >= filters().salary.from);
      }

      if (filters.salary.to()) {
        result = result.filter(e => e.salary <= filters().salary.to);
      }

      return result;
    })
  }))
)
