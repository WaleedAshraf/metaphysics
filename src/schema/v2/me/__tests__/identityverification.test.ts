/* eslint-disable promise/always-return */
import { runAuthenticatedQuery } from "schema/v2/test/utils"
import { IdentityVerificationGravityResponse } from "../identity_verification"

describe("IdentityVerification type", () => {
  it("returns the resolved identity verification", () => {
    const gravityIdentityVerification: IdentityVerificationGravityResponse = {
      id: "123",
      state: "pending",
      invitation_expires_at:
        "Mon Feb 10 2020 00:00:00 GMT-0500 (Eastern Standard Time)",
      user_id: "user1",
    }

    const query = `
      {
        me {
          identityVerification(id: "123") {
            id
            state
            userID
            invitationExpiresAt
          }
        }
      }
    `

    return runAuthenticatedQuery(query, {
      identityVerificationLoader: () =>
        Promise.resolve(gravityIdentityVerification),
    }).then(({ me }) => {
      expect(me).toEqual({
        identityVerification: {
          id: "123",
          state: "pending",
          userID: "user1",
          invitationExpiresAt:
            "Mon Feb 10 2020 00:00:00 GMT-0500 (Eastern Standard Time)",
        },
      })
    })
  })
})
