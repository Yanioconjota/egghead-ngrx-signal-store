import { signalStore, withState } from '@ngrx/signals';
import { Employee } from '../model';

type EmployeeState = {
  items: Employee[]
  filters: {
    name: string,
    salary: Record <'from' | 'to', number>
  }
}

const initialState: EmployeeState = {
  items: [],
  filters: {
    name: '',
    salary: {
      from: 0,
      to: 10_000
    }
  }
}

/**
 * EmployeeStore can be provided in the root module, a specific module, a component, a route or a service.
 * This makes it available for dependency injection where needed.
 */
export const EmployeeStore = signalStore(
  //{ providedIn: 'root' },
  withState(initialState)
  //withA(),
  //withB(),
  //withC(),
)
