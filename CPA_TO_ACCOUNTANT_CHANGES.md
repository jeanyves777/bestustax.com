# CPA to Accountant - Text Updates

## Changes Overview

All references to "CPA" have been replaced with "Accountant" throughout the website until the owner obtains their CPA certification.

---

## Files Modified

### 1. Hero Section
**File:** `/var/bestustax/src/components/home/HeroSection.tsx`

**Changes:**
- Feature list: `'Expert CPA Review'` → `'Expert Accountant Review'`
- Subheading: `"expert CPA support"` → `"expert accountant support"`

**Lines changed:**
```typescript
const features = [
  'Maximum Refund Guarantee',
  'Expert Accountant Review',  // Changed from 'Expert CPA Review'
  'Secure & Encrypted',
]

// Subheading
"Modern tax filing with expert accountant support..."  // Changed from "CPA support"
```

---

### 2. Page Metadata (SEO)
**File:** `/var/bestustax/src/app/layout.tsx`

**Changes:**
- Page title
- Meta description
- Keywords
- OpenGraph tags
- Twitter card tags

**Before:**
```typescript
title: 'BestUSTax - Maximum Tax Refunds with Expert CPA Support'
description: 'Modern tax filing with expert CPA support...'
keywords: [..., 'CPA', ...]
```

**After:**
```typescript
title: 'BestUSTax - Maximum Tax Refunds with Expert Accountant Support'
description: 'Modern tax filing with expert accountant support...'
keywords: [..., 'accountant', ...]
```

**Specific changes:**
1. **Title tag**: Changed to include "Expert Accountant Support"
2. **Meta description**: Updated to reference "accountant support"
3. **Keywords array**: Replaced `'CPA'` with `'accountant'`
4. **OpenGraph title**: Updated for social media sharing
5. **OpenGraph description**: Updated for social media sharing
6. **Twitter card title**: Updated for Twitter sharing
7. **Twitter card description**: Updated for Twitter sharing

---

### 3. Personal Tax Services Page
**File:** `/var/bestustax/src/app/services/personal-tax/page.tsx`

**Changes:**
- Page metadata description
- Premium pricing tier feature

**Before:**
```typescript
description: 'Expert individual tax preparation services. Maximize your refund with professional CPA support.'

features: [
  ...
  'Dedicated CPA review',
  ...
]
```

**After:**
```typescript
description: 'Expert individual tax preparation services. Maximize your refund with professional accountant support.'

features: [
  ...
  'Dedicated accountant review',
  ...
]
```

---

### 4. Floating Numbers Animation
**File:** `/var/bestustax/src/components/animations/FloatingNumbers.tsx`

**Changes:**
- Background floating text elements

**Before:**
```typescript
const taxNumbers = ['$', '1040', 'W-2', 'IRS', '%', 'TAX', '$$', 'CPA']
```

**After:**
```typescript
const taxNumbers = ['$', '1040', 'W-2', 'IRS', '%', 'TAX', '$$', 'ACCT']
```

**Note:** Changed 'CPA' to 'ACCT' (short for Accountant) to maintain visual consistency in the floating animation.

---

## Impact Summary

### User-Facing Text
All user-facing references to "CPA" have been updated to "Accountant":
- ✅ Hero section features
- ✅ Hero section description
- ✅ Page titles
- ✅ Meta descriptions
- ✅ Service descriptions
- ✅ Pricing tier features
- ✅ Background animations

### SEO Impact
Updated for search engines:
- ✅ Page title metadata
- ✅ Meta descriptions
- ✅ Keywords
- ✅ OpenGraph tags (Facebook, LinkedIn sharing)
- ✅ Twitter card tags (Twitter/X sharing)

### Total Changes
- **4 files modified**
- **10+ text instances updated**
- **0 functionality changes** (only text updates)

---

## Verification

To verify all CPA references have been replaced:
```bash
# Search for any remaining "CPA" references
grep -r "CPA" /var/bestustax/src

# Result: No matches found ✅
```

---

## Future Updates

When the owner obtains CPA certification, simply reverse these changes:
1. Find and replace "accountant" with "CPA" (case-insensitive)
2. Change "ACCT" back to "CPA" in FloatingNumbers.tsx
3. Update meta tags and descriptions
4. Restart the server

**Quick revert command:**
```bash
# This can be used when CPA certification is obtained
grep -rl "accountant" /var/bestustax/src | xargs sed -i 's/accountant/CPA/gi'
grep -rl "Accountant" /var/bestustax/src | xargs sed -i 's/Accountant/CPA/g'
grep -rl "ACCT" /var/bestustax/src | xargs sed -i 's/ACCT/CPA/g'
```

---

## Server Status

✅ **Changes deployed successfully**
- PM2 restarted: ✅
- Server status: Online
- Memory: 52.6 MB
- URL: http://82.180.139.117

---

## Brand Consistency

All references now consistently use:
- **"Expert Accountant"** instead of "Expert CPA"
- **"Accountant support"** instead of "CPA support"
- **"Accountant review"** instead of "CPA review"
- **"ACCT"** in animations instead of "CPA"

The terminology is professional and accurate for the current business status.
