export interface MockProject {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export const MOCK_PROJECTS: MockProject[] = [
  { id: "1", name: "My First Architecture", slug: "my-first-architecture", isOwner: true },
  { id: "2", name: "API Gateway Design", slug: "api-gateway-design", isOwner: true },
]

export const MOCK_SHARED_PROJECTS: MockProject[] = [
  { id: "3", name: "Team Backend", slug: "team-backend", isOwner: false },
]
