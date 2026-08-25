# Review replies - the spec

How to answer reviews, especially the bad ones. `/review-generator` writes the reply templates to this file's rules. Built from a sweep of ~20 industry sources in August 2026; the numbers below carry their sources so you can check the ones that drive a decision.

**The one-line version:** reply to everything, fast, short, warm, and never argue in public.

---

## Why this is worth doing at all

- **89% of consumers read business responses to reviews.** The reply is read by far more people than the reviewer.
- **Replying to 100% of reviews is associated with ~16% higher conversion** than not replying, and businesses replying to at least a quarter of reviews average materially more revenue.
- **80% say they are more likely to use a business that responds to all its reviews.**
- **Response rate and recency are local ranking signals.** Two businesses with the same star rating do not rank the same if one engages and the other does not. A 100% response rate is one of the cheapest local SEO wins available.

Treat these as directional industry figures, not laws of physics: most come from vendor studies of their own customer base. The direction is consistent across all of them, which is what matters.

---

## The rules that apply to every reply

1. **Speed beats polish.** Within 24 hours, ideally 2-4. An unanswered 1-star is the dominant impression for everyone who visits the profile until it is answered.
2. **100-150 words maximum.** Long replies read as defensive or robotic. Say the thing and stop.
3. **Never be defensive - especially when they are wrong.** The reply is not addressed to the reviewer. It is addressed to the next person reading, who is deciding whether you are the kind of business that handles a problem well. A correct, indignant reply loses that person. A short, gracious one wins them.
4. **Use their name, name something specific.** Generic replies read as automated and buy nothing.
5. **Take it offline, once.** Give a direct route (name, phone, email) and stop. Do not negotiate in the thread.
6. **Never offer money, refunds or discounts in public.** It invites the next complaint to start public.
7. **Keywords: heavy on 5-star replies, near-zero on negatives.** Nobody wants "emergency plumber in Burlington" in a paragraph about their bad experience, and it reads as marketing over a complaint.
8. **Never write in a voice that is not yours.** Replies load `context/voice.md`. A stiff corporate reply from a two-person trade business is more obviously fake than no reply.
9. **One reply, then stop.** Answering an angry follow-up publicly is how a bad review becomes a thread.

---

## The 4-step shape for a negative reply

Every tough reply is the same four beats, in order, and it fits in 100 words:

1. **Thank + acknowledge** - no "but", no qualifier. "Thanks for telling us, and I'm sorry this was your experience."
2. **One line of ownership or clarity** - own what is true. If a fact is genuinely wrong, correct it ONCE, neutrally, without arguing the interpretation.
3. **What changes** - the concrete thing being done, if anything. Skip if there isn't one; do not invent a policy.
4. **The offline route** - a named human and a direct contact.

**Never:** justify at length · list their errors · mention their behaviour · use "unfortunately" · use "we strive to" · imply they are lying · thank them for "the feedback" as the whole reply.

---

## The six hard cases

**1. Something genuinely went wrong.** The easiest one. Own it fully and fast. No hedging, no partial ownership - a full apology from a business reads as confidence, and readers reward it. This is the reply most likely to win a customer *because* of the bad review.

**2. Scope mix-up (they expected something you never sold).** Do not litigate. Acknowledge the mismatch as a communication failure on your side, state plainly what the job did include in one neutral sentence, and offer to talk. "That is in the contract" is correct and it loses every reader.

**3. Slow communication.** Almost always true and almost always fixable. Own it, name the actual change (a callback window, a named contact), and skip the explanation about how busy you were.

**4. Price.** Never argue value in public and never restate the price. One line that your pricing is quoted up front and in writing before any work starts, then offline. Readers who see a defended price assume it was defended because it was unfair.

**5. Fake or not a customer.** **Report it first, reply second** - do not skip either.
   - Flag it: the three-dot menu on the review → Report review → pick the closest policy violation. Google runs automated filtering, then human review; expect 3-5 business days, sometimes weeks, and a fair number of first-pass rejections.
   - If rejected, escalate: Google Business Profile Help → Contact us → Reviews and photos → Manage customer reviews → chat (generally faster).
   - Removal only happens on an actual policy breach (fake engagement, conflict of interest, off-topic). "It is unfair" is not a policy breach.
   - Reply anyway while it is pending, once, neutrally: you cannot find a record matching this, you would genuinely like to help if they are a customer, here is how to reach you. **Never accuse them of being fake in public** - if the flag succeeds the reply disappears with it, and if it fails you have called a stranger a liar in front of buyers.

**6. Angry but vague ("terrible service, avoid").** Nothing to own and nothing to correct. Short, warm, unrattled, offline route offered. Three sentences maximum. The brevity is the message.

---

## Regulated trades - check before writing a word

**Healthcare (US) is the big one, and the trap is not obvious.** HIPAA prohibits a provider from acknowledging that someone is or was a patient at all - even when the reviewer volunteered it themselves in public. "We're sorry about your experience during your visit" is already a violation, because it confirms a visit happened. OCR has issued real monetary penalties for exactly this, including a dental practice that named a patient and their treatment in a Yelp reply.

The compliant pattern: reply generically about the practice's processes, never confirming or denying that the person is a patient, and never repeating any detail they disclosed. Move it to a phone number.

**Other regulated fields** (legal, financial advice, insurance) have their own confidentiality and advertising rules. **If the business is regulated, say so out loud, apply the generic pattern, and tell them to run reply wording past their compliance person or lawyer once - then reuse the approved shape.**

**Defamation:** if a review is false and damaging, that is a lawyer conversation, not a reply conversation. Never threaten legal action in a public reply. It never removes the review and it always becomes the story.

---

## Positive replies (do not skip these)

They are 80% of the volume and they carry the response-rate signal that ranks.

- **5-star:** short, warm, use their name, name the specific service. This is the one place a natural keyword mention belongs.
- **4-star:** thank them, and ask lightly what would have made it a 5. Never sound wounded by a 4.
- **Review with no text:** still reply. One warm line. It counts toward response rate.

---

## What `/review-generator` produces from this file

12 templates in the owner's voice: four 5-star variants, two 4-star, and six covering the hard cases above. Plus the reporting walkthrough for case 5, and a regulated-trade flag if `context/business.md` shows healthcare, legal or financial services.

**Templates are starting points, never paste-and-send.** Every reply names something specific from the actual review. A profile full of visibly identical replies is worse than no replies - it tells every reader the business is running a script.

---

## Sources

Response-rate and conversion figures: [SabaSEO](https://www.sabaseo.com/impact-of-responding-to-reviews-on-conversion-rates/) · [ReputationX](https://www.reputationx.com/blog/online-reputation-management-statistics) · [Shapo review statistics](https://shapo.io/blog/review-statistics/). Reply best practice: [ReplyOnTheFly](https://www.replyonthefly.com/blog/google-review-response-best-practices) · [WiserReview](https://wiserreview.com/blog/how-to-respond-to-google-reviews/) · [Fokal](https://www.fokal.com/local-seo/google-review-responses/). Fake review reporting: [Sterling Sky on policy violations](https://www.sterlingsky.ca/google-review-policy-violations/) · [Birdeye on Google's review policy](https://birdeye.com/blog/google-review-policy/). HIPAA: [Bass Berry & Sims](https://www.bassberry.com/news/how-can-healthcare-providers-respond-to-online-patient-reviews-without-violating-hipaa/) · [Paubox](https://www.paubox.com/blog/understanding-hipaa-compliance-in-online-review-responses).
