# TypeScript Utility Types Cheat Sheet

## Base Type
```typescript
type User = { id: number; name: string; age?: number };
```

## Makes all properties optional
```typescript
type PartialUser = Partial<User>; // { id?: number; name?: string; age?: number }
```

## Makes all properties required
```typescript
type RequiredUser = Required<User>; // { id: number; name: string; age: number }
```

## Makes all properties read-only
```typescript
type ReadonlyUser = Readonly<User>; // readonly id, name, age
```

## Picks specific keys
```typescript
type UserNameOnly = Pick<User, "name">; // { name: string }
```

## Omits specific keys
```typescript
type WithoutAge = Omit<User, "age">; // { id: number; name: string }
```

## Creates a type with dynamic keys
```typescript
type Roles = "admin" | "user";
type RoleMap = Record<Roles, boolean>; // { admin: boolean; user: boolean }
```

## Excludes a type from union
```typescript
type T1 = Exclude<"a" | "b" | "c", "b">; // 'a' | 'c'
```

## Extracts a type from union
```typescript
type T2 = Extract<"a" | "b" | "c", "a" | "d">; // 'a'
```

## Removes null and undefined
```typescript
type T3 = NonNullable<string | null | undefined>; // string
```

## Gets return type of a function
```typescript
const fn = () => 42;
type Result = ReturnType<typeof fn>; // number
```

## Gets parameter types of a function
```typescript
type Params = Parameters<(x: number, y: string) => void>; // [x: number, y: string]
```

## Gets constructor parameters
```typescript
class Example {
  constructor(
    public a: string,
    public b: number,
  ) {}
}
type CParams = ConstructorParameters<typeof Example>; // [a: string, b: number]
```

## Gets instance type from constructor
```typescript
type Instance = InstanceType<typeof Example>; // Example
```